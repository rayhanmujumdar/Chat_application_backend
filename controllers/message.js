const pusher = require("../utils/pusher");
const {
  sendMessagesService,
  getMessageService,
  deleteMessageService,
} = require("../services/messages");
const error = require("../utils/error");
// get specific user messages controller
exports.getMessageController = async (req, res, next) => {
  try {
    const searchQuery = req.query;
    const {data,totalCount} = await getMessageService(searchQuery) || {};
    if (!data) {
      throw error(500, "internal server error");
    }
    res.header('Access-control-Expose-Headers',"X-Total-Count")
    res.header("X-Total-Count",totalCount)
    res.status(200).json({
      message: "success",
      data,
    });
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
    // pusher tool api use to realtime chat
    pusher.trigger(process.env.PUSHER_CHANNEL_NAME, "message", {
      message: "success",
      data: sendMessageResult,
    });
    // TODO: add to socket io with new message
    // io.emit("message", {
    //   message: "Success",
    //   data: sendMessageResult,
    // });
    // send response data
    res.status(200).json({
      message: "success",
      data: sendMessageResult,
    });
  } catch (err) {
    next(error(500, err.message));
  }
};

// create a delete all message controller
exports.deleteMessageController = async (req,res) => {
  const {deletedCount} = await deleteMessageService()
  res.status(200).json({
    message: 'success',
    deletedCount
  })
}