const { registerService } = require("../services/auth.js");
// login controller handler
exports.loginController = (req, res) => {
  res.status(200).json({
    message: "Success",
  });
};

// register controller handler
/* 
- email
- password
- name
*/
exports.registerController = async (req, res) => {
  const { name, email, password } = req.body || {};
  try {
    const token = await registerService({ name, email, password });
    res.status(200).json({
      message: "success",
      token
    })
  } catch (err) {
    res.status(err.status).json({message: err.message})
  }
};
