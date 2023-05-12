const {
  createConversationService,
  getConversationService,
  updateConversationService,
} = require("../services/conversationService");
const { sendMessagesService } = require("../services/messages");
const error = require("../utils/error");

// get user Conversation
exports.getConversationController = async (req, res, next) => {
  try {
    const queryInfo = req.query;
    const result = await getConversationService(queryInfo);
    if (!result) {
      throw error(500, "internal server error");
    }
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
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
	console.log(err.message)
    next(error(500, err.message));
  }
};
