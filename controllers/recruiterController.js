const Recruiter = require("../models/Recruiter");

exports.registerGST = async (req, res) => {
  try {
    const { name, email, gstNumber } = req.body;
    const recruiter = new Recruiter({ name, email, gstNumber });
    await recruiter.save();
    res
      .status(201)
      .json({ message: "GST number registered successfully", recruiter });
  } catch (error) {
    console.log(error);
    
    res
      .status(500)
      .json({ message: "Error registering GST number", error: error.message });
  }
};
