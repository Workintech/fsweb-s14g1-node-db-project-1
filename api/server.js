const express = require("express");

const server = express();

server.use(express.json());

const userAccount = require("./accounts/accounts-router");

server.use("/api/accounts", userAccount);
server.get("/", (req, res) => {
  res.json({ message: "Hey, server is up and running..." });
});

module.exports = server;
