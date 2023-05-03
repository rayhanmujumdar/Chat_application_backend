const router = require("express").Router();
const authRouter = require("./auth");
const conversationRouter = require("./conversation");
const messageRouter = require("./message");
const verifyToken = require("../middleware/verifyToken");
// check health route
router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "success",
  });
});

// auth route
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/conversation", verifyToken, conversationRouter);
router.use("/api/v1/message", verifyToken, messageRouter);

module.exports = router;
