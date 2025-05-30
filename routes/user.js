const { Router }= require("express");
const userRouter= Router();
const {userModel}= require("../db");

userRouter.post("/signin", (req, res) => {
  res.send("Hello world!");
});
userRouter.post("/signup", (req, res) => {
  res.send("signed up !");
});
userRouter.get("/purchases", (req, res) => {
  res.send("course purchased");
});


module.exports = {
  userRouter: userRouter,
};
