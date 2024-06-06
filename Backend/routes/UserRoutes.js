const express = require('express');
const router = express.Router();
const userController = require("../repositories/user.js");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/nickname", userController.getNick); //Routing for nickname


module.exports = router;