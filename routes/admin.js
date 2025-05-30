const { Router }= require("express");
const adminRouter= Router();
const {adminModel}= require("../db");
adminRouter.post("user/signin", (req, res) => {
  res.send("Hello world!");
});
adminRouter.post("user/signup", (req, res) => {
  res.send("signed up !");
});
adminRouter.get("user/purchases", (req, res) => {
  res.send("course purchased");
});
adminRouter.get("course/bulk", (req, res) => {
  res.send("course purchased");
});
adminRouter.post("course/purchases", (req, res) => {
  res.send("course purchased");
});


module.exports = {
  adminRouter: adminRouter,
};