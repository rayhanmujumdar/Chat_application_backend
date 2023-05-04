const Message = require("../models/messageSchema");

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
