const express = require("express");
const mongoose = require("mongoose");
const Userroutes = require("./routes/User_routes");
const Blogroutes = require("./routes/Blog_routes");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://sanjayjanardhan231:eiBrcBkYNSx5z1wN@cluster0.rwwknqs.mongodb.net/"
  )
  .then(() => {
    console.log("database connected");
  });
app.use("/api/user", Userroutes);
app.use("/api/blog", Blogroutes);

app.listen(5000, () => {
  console.log("server is running");
});
