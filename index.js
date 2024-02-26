const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const clc = require("cli-color");

//file-import
const {userDataValidation} = require('./utils/authUtils')

//Constants
const PORT = process.env.PORT;
const app = express();

//Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());// if api is requested by axios as we are doing in postman

//Db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(clc.yellowBright.bold("MongoDb Connected successfully"));
  })
  .catch((error) => {
    console.log(clc.redBright(error));
  });

//APIs
app.get("/", (req, res) => {
  return res.send("TODO app server is running...");
});

app.get("/register", (req, res) => {
  // return res.send("Welcome to the Registration Page");
  return res.render("registerPAge");
});
app.post("/register", async(req, res) => {
  console.log(req.body);
  const { name, email, username, password } = req.body;

  //data validation
  try {
      await userDataValidation({ name, email, username, password })
  } catch (error) {
    return res.send({
        status: 400,
        message:"user data error",
        error: error,
    })
  }


  //check if email & username are already registered
  //store data in DB

  return res.send("registration successfull");
});

app.get("/login", (req, res) => {
  return res.render("loginPage");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  return res.send("login successfull");
});

app.listen(PORT, () => {
  console.log(clc.yellowBright.underline(`server is running`));
  console.log(clc.yellowBright.underline(`http://localhost:${PORT}`));
});
