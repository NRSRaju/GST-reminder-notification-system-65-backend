const Invoice = require("../models/Invoice");
const Notification = require("../models/Notification");
const PDFDocument = require("pdfkit");

exports.generateInvoice = async (req, res) => {
  try {
    const { recruiterId, amount } = req.body;
    const gst = amount * 0.18;
    const total = amount + gst;
    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = new Invoice({
      recruiter: recruiterId,
      invoiceNumber,
      amount,
      gst,
      total,
    });
    await invoice.save();

    // Create notification
    await Notification.create({
      recipient: recruiterId,
      message: `Invoice ${invoiceNumber} generated`,
      type: "Invoice",
    });

    res
      .status(201)
      .json({ message: "Invoice generated successfully", invoice });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating invoice", error: error.message });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findById(invoiceId).populate("recruiter");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(25).text("Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Date: ${invoice.generationDate.toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Recruiter: ${invoice.recruiter.name}`);
    doc.text(`GST Number: ${invoice.recruiter.gstNumber}`);
    doc.moveDown();
    doc.text(`Amount: $${invoice.amount}`);
    doc.text(`GST (18%): $${invoice.gst}`);
    doc.text(`Total: $${invoice.total}`);

    doc.end();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error downloading invoice", error: error.message });
  }
};