const express = require('express');
const router = express.Router();
const userController = require("../repositories/user.js");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/nickname", userController.getNick);
router.post("/point", userController.getPoint);
router.post("/levUp", userController.incrementLevel);
 //Routing for nickname


module.exports = router;