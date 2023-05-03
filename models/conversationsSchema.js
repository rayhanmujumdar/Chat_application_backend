const { model, Schema, default: mongoose } = require("mongoose");

const conversationSchema = new Schema({
  participants: {
    type: String,
    require: true,
  },
  users: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      require: true,
      validate: {
        validator: (v) => {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
            v
          );
        },
        message: "Email is not valid",
      },
    },
  },
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
