const express= require('express');
const port = 3000;
const {userRouter} = require("./routes/user");
const {courseRouter} = require ("./routes/course");
const { adminRouter } = require("./routes/admin");
const app= express();

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

app.listen(port,()=> {
    console.log(`app is listening on port ${port}`)
});