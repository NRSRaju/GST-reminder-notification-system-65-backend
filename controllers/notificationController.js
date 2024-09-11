const Notification = require("../models/Notification");
const Recruiter = require("../models/Recruiter");
const Invoice = require("../models/Invoice");
const nodemailer = require("nodemailer");

exports.getNotifications = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const notifications = await Notification.find({
      recipient: recruiterId,
    }).sort("-date");
    res.json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: error.message });
  }
};

exports.sendPaymentReminder = async (recruiterId, invoiceId) => {
  try {
    const recruiter = await Recruiter.findById(recruiterId);
    const invoice = await Invoice.findById(invoiceId);

    if (!recruiter || !invoice) {
      throw new Error("Recruiter or Invoice not found");
    }

    const notification = new Notification({
      recipient: recruiterId,
      message: `Payment reminder for invoice ${invoice.invoiceNumber}. Amount due: $${invoice.total}`,
      type: "Payment",
    });
    await notification.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "gade.manicharan12@gmail.com",
        pass: "eghd jrrw awkt iate",
      },
    });

    await transporter.sendMail({
      from: "noreply@example.com",
      to: recruiter.email,
      subject: "Payment Reminder",
      text: `Dear ${recruiter.name},\n\nThis is a reminder for your pending payment for invoice ${invoice.invoiceNumber}. Amount due: $${invoice.total}.\n\nPlease ensure timely payment.\n\nBest regards,\nYour Company`,
    });

    console.log(`Payment reminder sent to ${recruiter.email}`);
  } catch (error) {
    console.error("Error sending payment reminder:", error);
  }
};

exports.sendAdminReminder = async () => {
  try {
    const notification = new Notification({
      type: "Admin",
      message: "Reminder: GST payment due to government in 3 days",
    });
    await notification.save();

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "gade.manicharan12@gmail.com",
        pass: "eghd jrrw awkt iate",
      },
    });

    await transporter.sendMail({
      from: "noreply@example.com",
      to: "admin@example.com",
      subject: "GST Payment Reminder",
      text: "Reminder: GST payment is due to the government in 3 days. Please ensure timely payment.",
    });

    console.log("Admin GST payment reminder sent");
  } catch (error) {
    console.error("Error sending admin reminder:", error);
  }
};
