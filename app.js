const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const {
  logErrorMiddleware,
  returnError,
  unknownRoute,
} = require("./src/middlewares/error-handler");

const authRoute = require("./src/routes/auth-route");
const testRoute = require("./src/routes/test-route");
// const postRoute = require("./src/routes/post-route");

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["*"],
  allowedHeaders: ["*"],
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/backend_task/v1/auth", authRoute);
app.use("/api/backend_task/v1/tests", testRoute);
// app.use("/api/backend_task/v1/posts", postRoute);

app.use(unknownRoute);
app.use(logErrorMiddleware);
app.use(returnError);

module.exports = app;
