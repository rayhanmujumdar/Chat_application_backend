const {
  getConversationController,
  createConversationController,
  updateConversationController,
} = require("../controllers/conversations");

const router = require("express").Router();

router
  .route("/")
  // get user conversation router
  .get(getConversationController)
  // create a new conversation router
  .post(createConversationController);

// update user conversation router
router.patch("/:id", updateConversationController);

module.exports = router;
