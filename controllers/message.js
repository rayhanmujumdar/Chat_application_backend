const { sendMessagesService } = require("../services/messages");
const error = require("../utils/error");
// get specific user messages controller
exports.getMessageController = (req, res, next) => {
  try {
    const queryData = req.query;
    console.log(queryData);
  } catch (err) {
    next(error(500, err.message));
  }
};

// send a new message for receiver
exports.sendMessageController = async (req, res, next) => {
  try {
    const messageBody = req.body;
    if (Object.keys(messageBody).length <= 0) {
      throw error(500, "internal server error");
    }
    const sendMessageResult = await sendMessagesService(messageBody);
    if (!sendMessageResult) {
      throw error(500, "internal server error");
    }
    res.status(200).json({
      message: "success",
      data: sendMessageResult,
    });
  } catch (err) {
    next(error(500, err.message));
  }
};
