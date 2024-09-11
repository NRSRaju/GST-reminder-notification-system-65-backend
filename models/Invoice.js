const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  invoiceNumber: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  generationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
