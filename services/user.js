const User = require("../models/userSchema");

exports.createNewUser = ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return user.save();
};

exports.findUserByProperty = (key = "_id", value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};
