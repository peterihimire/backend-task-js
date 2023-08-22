const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { corsOptions } = require("./src/middlewares/cors-handler");
const {
  logErrorMiddleware,
  returnError,
  unknownRoute,
} = require("./src/middlewares/error-handler");

const authRoute = require("./src/routes/auth-route");
const userRoute = require("./src/routes/user-route");
const testRoute = require("./src/routes/test-route");

const app = express();

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/backend_task/v1/auth", authRoute);
app.use("/api/backend_task/v1/users", userRoute);
app.use("/api/backend_task/v1/tests", testRoute);

app.use(unknownRoute);
app.use(logErrorMiddleware);
app.use(returnError);

module.exports = app;
