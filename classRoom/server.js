const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('connect-flash');
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser("secrateCode"));
app.use("/users", users);
app.use("/posts", posts);

const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionOption))
app.use(flash());


// Cookies
app.get("/getsignedcookies", (req, res) => {
    res.cookie("name", "Hardik", { signed: true });
    res.send("signed cookies saved");
});
app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("verifed");
})
app.get("/getcookies", (req, res) => {
    res.cookie("name", "Hardik");
    res.cookie("madeIn", "India");
    res.send("Add cookies");
});
app.get("/greet", (req, res) => {
    let { name = "Hardik" } = req.cookies;
    res.send(`Hello, ${name}!!!`);
})
app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("This is Home Route");
});



// Express Sessions 



app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`Your request Count is ${req.session.count}`);
});


// connect Flash ----> 

app.get("/registar", (req, res) => {
    let { name = "God" } = req.query;
    req.session.name = name;
    if (name === "God") {
        req.flash("error", "User Not Registar!!!");
    } else {
        req.flash("success", "User Registar Successfuly...");
    }
    res.redirect("/hello");
});
app.get("/hello", (req, res) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page.ejs", { name: req.session.name })
});



// google maps...
app.get("/gmap",(req,res)=>{
    res.render("gmap.ejs");
})


app.get("/coordinat",async(req,res)=>{
    // const address = "Ahmedabad";
    // Nominatim API URL
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=Ahmedabad`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const location = data[0];
        const latitude = location.lat;
        const longitude = location.lon;
        console.log(latitude, "....", longitude);
      } 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    res.send("long,lat")
})



// Server Start...
app.listen(3000, () => {
    console.log("Server is start on port 3000");
})