const mongoose = require("mongoose");

const MONGO_URL =
  "url";

const userSchema = new mongoose.Schema({}, { strict: false });
const listingSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.model("User", userSchema, "users");
const Listing = mongoose.model("Listing", listingSchema, "listings");

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomBidAmount(basePrice, currentBid) {
  const floor = Math.max(basePrice || 0, currentBid || 0);
  const step = Math.floor(Math.random() * 6) + 1;
  return floor + step * 100000 + Math.floor(Math.random() * 50000);
}

async function seedBids() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const users = await User.find({});
    const listings = await Listing.find({ listingType: "sell" });

    if (!users.length) {
      console.log("No users found");
      return;
    }

    for (const listing of listings) {
      const sellerId = listing.owner ? listing.owner.toString() : null;
      const availableBidders = users.filter((user) => user._id.toString() !== sellerId);

      if (!availableBidders.length) {
        continue;
      }

      const bidCount = Math.floor(Math.random() * 4) + 2;
      const seededBids = [];
      let topBid = listing.price || 0;

      for (let i = 0; i < bidCount; i++) {
        const bidder = pickRandom(availableBidders);
        const amount = getRandomBidAmount(listing.price, topBid);

        topBid = Math.max(topBid, amount);
        seededBids.push({
          bidder: bidder._id,
          amount,
          createdAt: new Date(Date.now() - i * 1000 * 60),
        });
      }

      await Listing.updateOne(
        { _id: listing._id },
        {
          $set: {
            bids: seededBids,
            currentBid: topBid,
          },
        }
      );

      console.log(`Bids added for ${listing.title}`);
    }

    console.log("Bid data initialized successfully");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.connection.close();
  }
}

seedBids();