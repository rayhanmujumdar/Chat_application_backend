const Message = require("../models/messageSchema");

exports.getMessageService = (searchQuery) => {
  return Message.findMessageBySortAndPaginate(searchQuery);
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
