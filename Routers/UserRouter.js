const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../Controller/UserController");

router.post("/register", signupUser);
router.post("/login", loginUser);

// keep old route as alias
router.post("/signup", signupUser);

module.exports = router;
