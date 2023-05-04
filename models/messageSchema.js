const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  sender: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      require: true,
    },
  },
  receiver: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      require: true,
    },
  },
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = model("Message", messageSchema);
module.exports = Message;
