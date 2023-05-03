const { usersController } = require("../controllers/users");

const router = require("express").Router();

router.get("/", usersController);

module.exports = router;
