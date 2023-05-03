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
    const result = await getConversationService(queryInfo);
    console.log(result);
    if (!result) {
      throw error(500, "internal server error");
    }
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};

// create a new conversation
exports.createConversationController = async (req, res, next) => {
  try {
    const conversation = req.body;
    const result = await createConversationService(conversation);
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

// update user conversation
exports.updateConversationController = async (req, res, next) => {
  try {
    const {id} = req.params
    console.log(id)
  } catch (err) {
    next(error(500, err.message));
  }
};
