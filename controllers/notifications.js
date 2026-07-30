const Notification = require("../models/notification.js");

module.exports.index = async (req, res) => {
    const notifications = await Notification.find({ recipient: req.user._id })
        .populate("listing")
        .populate("sender")
        .sort({ createdAt: -1 });

    res.render("notifications/index.ejs", { notifications });
};

module.exports.markAsRead = async (req, res) => {
    await Notification.findOneAndUpdate(
        { _id: req.params.id, recipient: req.user._id },
        { read: true }
    );

    res.redirect("/notifications");
};