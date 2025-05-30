const Router = require ("express");
const courseRouter= Router();
const {courseModel}= require("../db");
courseRouter.get("/preview", (req, res) => {
  res.send("all courses");
});
courseRouter.post ("/purchase", (req, res) => {
  res.send("Hello world!");
});

module.exports = {
   courseRouter: courseRouter,
};