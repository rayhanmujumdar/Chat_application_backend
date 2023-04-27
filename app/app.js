require("dotenv").config();
const { errorHandler, infoErrorHandler } = require("../errors/error");
const router = require("../routes/index");
const express = require("express");
const rootMiddleware = require("../middleware/rootMiddleware");
const app = express();

// middleware
app.use(rootMiddleware);

// routes middleware
app.use(router);

// error middleware
app.use(infoErrorHandler);
app.use(errorHandler);

module.exports = app;
