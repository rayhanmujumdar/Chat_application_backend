const Conversation = require("../models/conversationsSchema");
const error = require("../utils/error");
const { findUserByProperty } = require("./user");

// get user conversation services
exports.getConversationService = ({
  participants,
  sort,
  order,
  page,
  limit,
}) => {};

// create a new conversation service

exports.createConversationService = async (conversationInfo) => {
  const { participants, users, messages, timestamp } = conversationInfo;
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
      messages,
      timestamp,
    });
    return conversation.save();
  }
};

// update conversation service
exports.updateConversationService = (conversationInfo) => {};
