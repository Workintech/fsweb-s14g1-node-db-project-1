const express = require("express");
const accountsRouter = require("./accounts/accounts-router"); // Yolun doğruluğunu kontrol et

const server = express();
server.use(express.json());

// BU SATIR KRİTİK:
server.use("/api/accounts", accountsRouter); 

server.get("/", (req, res) => {
  res.send("Server is running...");
});

module.exports = server;