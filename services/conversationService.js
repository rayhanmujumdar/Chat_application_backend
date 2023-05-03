const Conversation = require("../models/conversationsSchema");
const error = require("../utils/error");
const { findUserByProperty } = require("./user");

// get user conversation services
exports.getConversationService = (queryInfo) => {
  const { participants, sort, order, page, limit } = queryInfo;
  const pageOptions = {
    page: parseInt(page, 10) || 0,
    limit: parseInt(limit, 10) || 10,
  };
  return Conversation.find({ "users.email": participants })
    .skip(pageOptions.page > 1 ? (pageOptions.page - 1) * pageOptions.limit : 0)
    .sort({ [sort]: order })
    .limit(pageOptions.limit);
};

// create a new conversation service
exports.createConversationService = async (conversationInfo) => {
  const { participants, users, message, timestamp } = conversationInfo;
  const findConversation = new Conversation();
  // custom instance methods
  const prevConversation = await findConversation.findByConversation(
    participants
  );
  if (prevConversation) {
    throw error(500, "Conversation already exist");
  }
  const opponent = participants.split("-");
  const user = await findUserByProperty("email", opponent[1]);
  if (user) {
    const conversation = new Conversation({
      participants,
      users,
      message,
      timestamp,
    });
    return conversation.save();
  }
};

// update conversation service
exports.updateConversationService = (id, updateData) => {
  return Conversation.findOneAndUpdate({ _id: id }, updateData).select({
    __v: 0,
  });
};
