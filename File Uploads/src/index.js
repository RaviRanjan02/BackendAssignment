const express = require("express");

const userController = require("./controllers/users.controller");

const app = express();

// yaha pe yah toh hum middle ware ka use karenge multi part form data ko read krne ke liye yaha hum ek package ka use karenge MULTTER
app.use(express.json());

app.use("/users", userController);

module.exports = app;
