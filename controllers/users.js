const { findUserByProperty } = require("../services/user");
const error = require("../utils/error");
exports.usersController = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await findUserByProperty("email", email);
    if (!user) {
      throw error(500, "User not exist");
    }
    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (err) {
    console.log(err)
    next(error(500, "internal server error"));
  }
};
