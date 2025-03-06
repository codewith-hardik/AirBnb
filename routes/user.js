const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userController = require("../controllers/userController")

router.get("/signUp",userController.renderSignUpForm);

router.post(
    "/signUp",
    wrapAsync(userController.signUp)
);


router.get("/login", userController.renderLogninForm)
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
    wrapAsync(userController.login));


router.get("/logout", userController.logout)

module.exports = router;
