const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const error = require("../utils/error");
const { findUserByProperty, createNewUser } = require("./user.js");
exports.registerService = async ({ email, password, name }) => {
  const user = await findUserByProperty("email", email);
  if (user) {
    throw error(404, "user already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const userInfo = await createNewUser({
    email,
    password: hashPassword,
    name,
  });
  return jwt.sign(
    { name: userInfo.name, email: userInfo.password },
    process.env.JWTSCRECT,
    {
      expiresIn: "1h",
    }
  );
};
