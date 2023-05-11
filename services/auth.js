const bcrypt = require("bcrypt");
const error = require("../utils/error");
const { findUserByProperty, createNewUser, jwtToken } = require("./user.js");

// login services
exports.loginService = async ({ email, password }) => {
  console.log(email,password)
  const userInfo = await findUserByProperty("email", email);
  if(userInfo){
    const isPassword = await bcrypt.compare(password, userInfo.password);
    if(!isPassword) throw error(500,"Password doesn't match")
    if (userInfo && isPassword) {
      const token = await jwtToken({
        name: userInfo.name,
        email: userInfo.email,
      });
      return { token, user: userInfo };
    }
  }
  throw error(500,"User not found")
};

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
  const token = await jwtToken({ name: userInfo.name, email: userInfo.email });
  return { token, user: userInfo };
};
