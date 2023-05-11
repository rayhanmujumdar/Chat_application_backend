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
      require: true,
    },
    name: {
      type: String,
      require: true,
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
      require: true,
    },
    name: {
      type: String,
      require: true,
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

// create a custom statics method on mongoose
messageSchema.statics.findMessageBySortAndPaginate = function (searchQuery) {
  const { conversationId, sort, order, limit, page } = searchQuery;
  const pageOptions = {
    page: parseInt(page, 10) || 0,
    limit: parseInt(limit, 10) || 10,
  };
  return this.find({ conversationId: conversationId })
    .skip(pageOptions.page > 1 ? (pageOptions.page - 1) * pageOptions.limit : 0)
    .sort({ [sort]: order })
    .limit(limit);
};

const Message = model("Message", messageSchema);
module.exports = Message;
