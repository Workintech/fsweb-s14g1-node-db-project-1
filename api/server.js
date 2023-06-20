const express = require("express");
const accountRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter);

server.use((err, req, res, next) => { // eslint-disable-line
    res.status((err.status || 500)).json({ message: "SERVER ERROR, PLEASE TRY AGAIN LATER" })
})

module.exports = server;