const express = require("express");
const route = express.Router();


// user routes
route.get("/",(req,res)=>{
    res.send("Get user");
});
route.get("/:id",(req,res)=>{
    res.send("Get user id");
});
route.post("/",(req,res)=>{
    res.send("post user");
});
route.delete("/:id",(req,res)=>{
    res.send("delete  user id");
});


module.exports = route;
