const { model, Schema } = require("mongoose");

const conversationSchema = new Schema({
  participants: {
    type: String,
    require: true,
  },
  users: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        require: true,
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
  ],
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

conversationSchema.methods.findByConversation = function (participants) {
  return model("Conversation").findOne({ participants });
};

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
