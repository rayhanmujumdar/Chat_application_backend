const Conversation = require("../models/conversationsSchema");
const error = require("../utils/error");
const { sendMessagesService } = require("./messages");
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
  const receiver = await findUserByProperty("email", opponent[1]);
  if (receiver) {
    // if receiver user exist in data base then go to next level
    const conversation = new Conversation({
      participants,
      users,
      message,
      timestamp,
    });
    const conversationData = await conversation.save();
    const newMessage = {
      conversationId: conversationData._id,
      sender: users,
      receiver: {
        _id: receiver._id,
        email: receiver.email,
      },
      message,
    };
    const messageData = await sendMessagesService(newMessage);
    if (!messageData) {
      throw error(500, "internal server error");
    }
    return conversationData;
  }
};

// update conversation service
exports.updateConversationService = (id, updateData) => {
  return Conversation.findOneAndUpdate({ _id: id }, updateData).select({
    __v: 0,
  });
};
