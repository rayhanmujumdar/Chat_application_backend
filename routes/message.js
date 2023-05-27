const router = require("express").Router();
const {
  getMessageController,
  sendMessageController,
  deleteMessageController,
} = require("../controllers/message");

router
  .route("/")
  // get authenticate user messages
  .get(getMessageController)
  // post send new messages
  .post(sendMessageController)
  //delete all message in database
  .delete(deleteMessageController);

module.exports = router;
