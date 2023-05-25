require("dotenv").config();
const dbConnect = require("./db/db");
const http = require("http");
const app = require("./app/app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
// implement socket event
const io = require("socket.io")(server);

global.io = io;

dbConnect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eo3neab.mongodb.net/test`
)
  .then(() => {
    server.listen(port, () => {
      console.log(`server is running port - ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
