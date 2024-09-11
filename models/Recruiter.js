const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gstNumber: { type: String, required: true, unique: true },
  registrationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
