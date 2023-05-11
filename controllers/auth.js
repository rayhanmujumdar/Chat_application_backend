const { registerService, loginService } = require("../services/auth.js");
const error = require("../utils/error.js");
// login controller handler
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const { token: accessToken, user } = await loginService({ email, password });
    accessToken
      ? res.status(200).json({
        accessToken,
          user,
        })
      : res.status(500).json({
          message: "Something was wrong",
        });
  } catch (err) {
    const errors = error(404, err.message);
    next(errors);
  }
};

// register controller handler
/* 
- email
- password
- name
*/
exports.registerController = async (req, res, next) => {
  const { name, email, password } = req.body || {};
  try {
    const { user, token:accessToken } = await registerService({
      name,
      email,
      password,
    });
    accessToken
      ? res.status(200).json({
        accessToken,
          user,
        })
      : res.status(200).json({
          message: "Something was wrong",
        });
  } catch (err) {
    const errors = error(404, err.message);
    next(errors);
  }
};
