const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const notificationController = require("../controllers/notifications.js");

router.get("/", isLoggedIn, wrapAsync(notificationController.index));
router.post("/:id/read", isLoggedIn, wrapAsync(notificationController.markAsRead));

module.exports = router;