const Listing = require("../models/listing.js");
const Notification = require("../models/notification.js");
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeState(state) {
    return typeof state === "string" ? state.trim().toLowerCase() : "";
}

async function notifyUsersInState(listing) {
    if (listing.listingType !== "sell" || !listing.state) return;

    const recipients = await User.find({
        state: listing.state,
        _id: { $ne: listing.owner },
    });

    if (!recipients.length) return;

    const notifications = recipients.map((recipient) => ({
        recipient: recipient._id,
        listing: listing._id,
        message: `New property for sale in ${listing.state}: ${listing.title}`,
    }));

    await Notification.insertMany(notifications);
}

module.exports.index = async (req, res) => {
    const { q } = req.query;
    let filter = {};

    if (q && q.trim() !== "") {
        const searchTerm = escapeRegex(q.trim());

        filter = {
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { location: { $regex: searchTerm, $options: "i" } },
                { country: { $regex: searchTerm, $options: "i" } },
            ],
        };
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", {
        allListings,
        query: q || "",
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("bids.bidder")
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested doesn't exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    const url = req.file.path;
    const filename = req.file.filename;

    const newlisting = new Listing(req.body.listing);

    newlisting.state = normalizeState(newlisting.state);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };

    if (newlisting.listingType === "sell") {
        newlisting.currentBid = newlisting.price;
    }

    const savedListing = await newlisting.save();

    await notifyUsersInState(savedListing);

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested doesn't exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {
        listing,
        originalImageUrl,
    });
};

module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }

    const { id } = req.params;

    const previousListing = await Listing.findById(id);

    req.body.listing.state = normalizeState(req.body.listing.state);

    const listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { new: true }
    );

    if (listing.listingType === "sell") {
        listing.currentBid = Math.max(
            listing.currentBid || 0,
            listing.price || 0
        );
    }

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await listing.save();

    const shouldNotify =
        listing.listingType === "sell" &&
        (previousListing.listingType !== "sell" ||
            previousListing.state !== listing.state);

    if (shouldNotify) {
        await notifyUsersInState(listing);
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.createBid = async (req, res) => {
    const { id } = req.params;
    const bidAmount = Number(req.body.bid?.amount);

    if (Number.isNaN(bidAmount)) {
        throw new ExpressError(400, "Enter a valid bid amount");
    }

    const listing = await Listing.findById(id).populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested doesn't exist!");
        return res.redirect("/listings");
    }

    if (listing.listingType !== "sell") {
        throw new ExpressError(
            400,
            "Bidding is only available for sale listings"
        );
    }

    const minimumBid = Math.max(
        listing.currentBid || 0,
        listing.price || 0
    );

    if (bidAmount <= minimumBid) {
        throw new ExpressError(
            400,
            `Bid must be above ₹${minimumBid.toLocaleString("en-IN")}`
        );
    }

    listing.currentBid = bidAmount;

    listing.bids.push({
        bidder: req.user._id,
        amount: bidAmount,
    });

    await listing.save();

    await Notification.create({
        recipient: listing.owner._id,
        listing: listing._id,
        message: `${req.user.username} placed a bid of ₹${bidAmount.toLocaleString(
            "en-IN"
        )} on ${listing.title}`,
    });

    req.flash("success", "Bid placed successfully!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.messageBidder = async (req, res) => {
    const { id, bidderId } = req.params;

    const message =
        typeof req.body.message === "string"
            ? req.body.message.trim()
            : "";

    if (!message) {
        throw new ExpressError(
            400,
            "Enter a message before sending"
        );
    }

    const listing = await Listing.findById(id).populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested doesn't exist!");
        return res.redirect("/listings");
    }

    const bidderExists = listing.bids.some(
        (bid) =>
            bid.bidder &&
            bid.bidder.toString() === bidderId
    );

    if (!bidderExists) {
        throw new ExpressError(
            400,
            "That bidder was not found on this listing"
        );
    }

    await Notification.create({
        sender: req.user._id,
        recipient: bidderId,
        listing: listing._id,
        message: `Message from ${req.user.username} about ${listing.title}: ${message}`,
    });

    req.flash("success", "Message sent to bidder!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;

    const deletedlisting = await Listing.findByIdAndDelete(id);

    console.log(deletedlisting);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};