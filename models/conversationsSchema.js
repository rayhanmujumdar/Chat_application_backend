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
        required: true,
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

// Instance methods
conversationSchema.methods.findByConversation = function (participants) {
  return model("Conversation").findOne({ participants });
};

// statics method

conversationSchema.statics.findConversationBySortAndPaginate = function (
  queryInfo
) {
  const { participants, sort, order, page, limit } = queryInfo;
  const pageOptions = {
    page: parseInt(page, 10) || 0,
    limit: parseInt(limit, 10) || 10,
  };
  const participantsProperty = Array.isArray(participants)
    ? "participants"
    : "users.email";
  return this.find({ [participantsProperty]: participants })
    .skip(pageOptions.page > 1 ? (pageOptions.page - 1) * pageOptions.limit : 0)
    .sort({ [sort]: order ? order : "asc" })
    .limit(pageOptions.limit);
};
conversationSchema.statics.countTotal = function (participants) {
  const participantsProperty = Array.isArray(participants)
    ? "participants"
    : "users.email";
  return this.where({ [participantsProperty]: participants }).count();
};

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
