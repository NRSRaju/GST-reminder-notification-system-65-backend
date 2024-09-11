const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter" },
  message: { type: String, required: true },
  type: { type: String, enum: ["Invoice", "Payment", "Admin"], required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notification", NotificationSchema);