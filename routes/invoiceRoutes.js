const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.post("/generate", invoiceController.generateInvoice);
router.get("/download/:invoiceId", invoiceController.downloadInvoice);

module.exports = router;
