const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "pong" });
    next();
  });

  app.use(routes);
  return app;
};

module.exports = { createApp };
