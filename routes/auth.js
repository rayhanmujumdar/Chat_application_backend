const router = require("express").Router();
const { loginController, registerController } = require("../controllers/auth");

/* 
- email
- password
- name
*/
router.post("/register", registerController);

/* 
- email
- password
*/
router.post("/login", loginController);
module.exports = router;
