const cron = require("node-cron");
const {
  sendAdminReminder,
  sendPaymentReminder,
} = require("../controllers/notificationController");
const Invoice = require("../models/Invoice");

const setupCronJobs = () => {
  // Run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    const daysUntilMonthEnd = Math.ceil(
      (lastDayOfMonth - today) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilMonthEnd <= 3) {
      await sendAdminReminder();
    }

    // Check for pending invoices and send reminders
    const pendingInvoices = await Invoice.find({ status: "Pending" });
    for (const invoice of pendingInvoices) {
      const daysOverdue = Math.ceil(
        (today - invoice.generationDate) / (1000 * 60 * 60 * 24)
      );
      if (daysOverdue >= 7) {
        await sendPaymentReminder(invoice.recruiter, invoice._id);
      }
    }
  });
};

module.exports = setupCronJobs;
