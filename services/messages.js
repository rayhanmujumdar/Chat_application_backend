const Message = require("../models/messageSchema");

exports.getMessageService = async (searchQuery) => {
  // create my own instance of
  const totalCount = await Message.countTotal(
    searchQuery.conversationId
  ).count();
  const data = await Message.findMessageBySortAndPaginate(searchQuery);
  return { data, totalCount };
};

exports.sendMessagesService = (messageInfo) => {
  const { conversationId, sender, receiver, message } = messageInfo || {};
  const messages = new Message({
    conversationId,
    sender,
    receiver,
    message,
  });
  return messages.save();
};

// delete message service
exports.deleteMessageService = () => {
  return Message.deleteMany();
};
