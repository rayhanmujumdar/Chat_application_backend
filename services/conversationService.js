const Conversation = require("../models/conversationsSchema");
const error = require("../utils/error");
// const { sendMessagesService } = require("./messages");
const { findUserByProperty } = require("./user");

// get user conversation services
exports.getConversationService = async (queryInfo) => {
  const result = await Conversation.findConversationBySortAndPaginate(
    queryInfo
  );
  const totalCount = await Conversation.countTotal(queryInfo?.participants);
  return { result, totalCount };
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
    // if receiver exist in database then go to next level
    const conversation = new Conversation({
      participants,
      users,
      message,
      timestamp,
    });
    // if i will entry any message in database when i am call conversation api.
    // const newMessage = {
    //   conversationId: conversationData._id,
    //   sender: conversationData?.users[0],
    //   receiver: conversationData?.users[1],
    //   message: conversationData?.message,
    // };
    // const messageData = await sendMessagesService(newMessage);
    // if (!messageData) {
    //   throw error(500, "internal server error");
    // }
    return conversation.save();
  }
};

// update conversation service
exports.updateConversationService = async (id, updateData) => {
  if (Object.keys(updateData).length <= 0) {
    throw error(500, "There was an error");
  }
  return Conversation.findOneAndUpdate({ _id: id }, updateData, {
    returnDocument: "after",
  }).select({
    __v: 0,
  });
};
