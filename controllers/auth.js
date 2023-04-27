const { registerService, loginService } = require("../services/auth.js");
const error = require("../utils/error.js");
// login controller handler
exports.loginController = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService({ email, password });
    token
      ? res.status(200).json({
          message: "success",
          token,
        })
      : res.status(404).json({
          message: "Something was wrong",
        });
  } catch (err) {
    const errors = error(404, "Server error");
    next(errors);
  }
};

// register controller handler
/* 
- email
- password
- name
*/
exports.registerController = async (req, res,next) => {
  const { name, email, password } = req.body || {};
  try {
    const token = await registerService({ name, email, password });
    token
      ? res.status(200).json({
          message: "success",
          token,
        })
      : res.status(200).json({
          message: "Something was wrong",
        });
  } catch (err) {
    const errors= error(404, "Server error");
    next(errors);
  }
};
