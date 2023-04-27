const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    minLength: [6, "Must be at least 6,got {VALUE}"],
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    require: true,
    validate: {
      validator: (value) => {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
          value
        );
      },
      message: (props) => `${props.value} is not valid`,
    },
  },
  password: {
    type: String,
    require: [true, "password must be required"],
  },
});

const User = model("User", userSchema);

module.exports = User;
