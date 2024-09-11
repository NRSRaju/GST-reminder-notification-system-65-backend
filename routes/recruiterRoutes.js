const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");

router.post("/register", recruiterController.registerGST);

module.exports = router;
