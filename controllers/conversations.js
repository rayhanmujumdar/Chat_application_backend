const pusher = require("../utils/pusher");
const {
  createConversationService,
  getConversationService,
  updateConversationService,
} = require("../services/conversationService");
const error = require("../utils/error");

// get user Conversation
exports.getConversationController = async (req, res, next) => {
  try {
    const queryInfo = req.query;
    const { result, totalCount } = await getConversationService(queryInfo);
    if (!result) {
      throw error(500, "internal server error");
    }
    res.header("Access-control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    next(error(500, err.message));
  }
};

// create a new conversation
exports.createConversationController = async (req, res, next) => {
  try {
    const conversation = req.body;
    const conversationData = await createConversationService(conversation);
    if (!conversationData) {
      throw error(500, "internal server error");
    }
    // pusher tool api use to realtime chat
    pusher.trigger(process.env.PUSHER_CHANNEL_NAME, "conversation", {
      message: "success",
      data: conversationData,
    });
    // TODO: add to socket io with conversation
    // io.emit("conversation", {
    //   message: "Success",
    //   data: conversationData,
    // });
    res.status(200).json({
      message: "Success",
      data: conversationData,
    });
  } catch (err) {
    next(error(500, err.message));
  }
};

// update user conversation
exports.updateConversationController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (Object.keys(updateData)?.length <= 0) {
      throw error(500, "internal server error");
    }
    const result = await updateConversationService(id, updateData);
    if (!result) {
      throw error(500, "internal server error");
    }
    // pusher tool api use to realtime chat
    pusher.trigger(process.env.PUSHER_CHANNEL_NAME, "conversation", {
      message: "success",
      data: result,
    });
    // TODO: add to socket io with conversation
    // io.emit("conversation", {
    //   message: "Success",
    //   data: result,
    // });

    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    next(error(500, err.message));
  }
};


