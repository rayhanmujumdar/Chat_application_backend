const router = require("express").Router();
const {
  getMessageController,
  sendMessageController,
} = require("../controllers/message");

router
  .route("/")
  // get authenticate user messages
  .get(getMessageController)
  // post send new messages
  .post(sendMessageController);

module.exports = router;
