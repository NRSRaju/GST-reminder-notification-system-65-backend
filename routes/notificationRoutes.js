const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/:recruiterId", notificationController.getNotifications);

module.exports = router;
