const userController = require("../controller/userController.js");
const router = require("express").Router();

router.post("/signup", userController.addUser);
router.post("/login", userController.getUser);

module.exports = router;
