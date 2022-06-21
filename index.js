const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");
app.use(cors());
port = process.env.PORT;
token = process.env.TOKEN;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  next();
});

app.use("/login", function (req, res) {
  res.send({
    env: {
      token: process.env.TOKEN,
    },
  });
});

console.log(`Your token is ${token}`);

console.log(token);
app.listen(process.env.PORT, () =>
  console.log("API IS RUNNING ON PORT, port ", port)
);
