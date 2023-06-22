//Functionality - Login and Register routes

const express = require("express");
const router = express.Router();
const {registerUser, loginUser, currentUser, logoutUser} = require("../controllers/userController")
const validateToken = require("../middleware/validateHandler")

router.route("/register").post(registerUser)
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);
router.route("/logout").get(logoutUser)

module.exports = router;