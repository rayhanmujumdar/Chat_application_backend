const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const rootMiddleware = [cors(), express.json(), morgan("dev")];

module.exports = rootMiddleware;