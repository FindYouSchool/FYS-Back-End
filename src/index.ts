// const express = require("express");
// const dotenv = require("dotenv");
// dotenv.config();

// const app = express();

// const cors = require("cors");

// port = process.env.PORT;
// token = process.env.TOKEN;

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   next();
// });

// app.use("/login", function (req, res) {
//   res.send({
//     env: {
//       token: process.env.TOKEN,
//     },
//   });
// });

// console.log(`Your token is ${token}`);

// console.log(token);
// app.listen(process.env.PORT, () =>
//   console.log("API IS RUNNING ON PORT, port ", port)
// );
import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const token = process.env.TOKEN;

app.use("/login", function (req, res) {
  res.send({
    env: {
      token: process.env.TOKEN,
    },
  });
});

app.post("/signup", async (req, res) => {
  const { username, email, password, profile, notices } = req.body;

  const noticeData = notices?.map((notice: Prisma.NoticeCreateInput) => {
    return { comment: notice?.comment, author: notice?.author };
  });

  const profileData = profile?.map((profile: Prisma.ProfileCreateInput) => {
    return {
      student: profile?.student,
      company: profile?.company,
      speaker: profile?.speaker,
      employee: profile?.employee,
      teacher: profile?.teacher,
    };
  });

  const result = await prisma.user.create({
    data: {
      username,
      email,
      password,
      notices: {
        create: noticeData,
      },
      profile: {
        create: profileData,
      },
    },
  });
  res.json(result);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

console.log(`Your token is ${token}`);

console.log(token);

app.listen(process.env.PORT, () =>
  console.log("API IS RUNNING ON PORT, port ", port)
);
