const express = require("express");
const route = express.Router();


// post routes

route.get("/",(req,res)=>{
    res.send("Get posts");
});
route.get("/:id",(req,res)=>{
    res.send("Get posts id");
});
route.post("/",(req,res)=>{
    res.send("post posts");
});
route.delete("/:id",(req,res)=>{
    res.send("delete  posts id");
});

module.exports = route; 
