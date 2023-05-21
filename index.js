require("dotenv").config();
const dbConnect = require("./db/db");
const http = require("http");
const app = require("./app/app");

const port = process.env.PORT || 4000;

const server = http.createServer(app);
// implement socket event
const io = require("socket.io")(server);

global.io = io;

dbConnect("mongodb://localhost:27017")
  .then(() => {
    server.listen(port, () => {
      console.log(`server is running port - ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  });
