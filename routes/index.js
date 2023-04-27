const router = require("express").Router();
const authRouter = require("./auth");

// check health route
router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "success",
  });
});

// auth route
router.use("/api/v1/auth", authRouter);

module.exports = router;
