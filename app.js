const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routers/userRouter");

const port = 5000;

// to allow your frontend
app.use(cors({}));
app.use(express.json());

//middleware
app.use("/user", userRouter);

//to start server
app.listen(port, () => {
  console.log(`server started at port no ${port}`);
});
