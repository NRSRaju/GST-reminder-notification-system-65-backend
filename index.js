const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recruiterRoutes = require("./routes/recruiterRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const setupCronJobs = require("./utils/cronJobs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB

//sendNotification
mongoose
  .connect(
    "mongodb+srv://gademanicharan12:sendNotification@cluster0.lcwck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/notifications", notificationRoutes);

// Setup cron jobs
setupCronJobs();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
