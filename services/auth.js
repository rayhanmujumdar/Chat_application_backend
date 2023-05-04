const bcrypt = require("bcrypt");
const error = require("../utils/error");
const { findUserByProperty, createNewUser, jwtToken } = require("./user.js");

//register services
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
  return jwtToken({ name: userInfo.name, email: userInfo.email });
};

// login services
exports.loginService = async ({ email, password }) => {
  const userInfo = await findUserByProperty("email", email);
  const isPassword = await bcrypt.compare(password, userInfo.password);
  if (userInfo && isPassword) {
    return jwtToken({ name: userInfo.name, email: userInfo.email });
  }
};
