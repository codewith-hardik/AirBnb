const User = require("../models/user");

module.exports.renderSignUpForm = async (req, res) => {
    res.render("users/signUp.ejs");
}
module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // Await the registration process
        let newUser = new User({ email, username });
        let registerUser = await User.register(newUser, password);

        req.login(registerUser, (err) => {
            if (err) {
                return next()
            }
            // Flash success message and redirect
            req.flash("success", "Welcome To Wanderlust!!!");
            res.redirect("/listings");
        })

    } catch (e) {
        // Use e.message to show the error
        req.flash("error", e.message);
        res.redirect("/signUp");
    }
}

module.exports.renderLogninForm = (req, res) => {
    res.render("users/login.ejs");
}
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back to WanderLust!!!")
    res.redirect("/listings/new");
}
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next();
        }
        req.flash("success", "You Logged Out!!!");
        res.redirect("/listings");
    })
}


