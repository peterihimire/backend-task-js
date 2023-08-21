const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../utils/http-status-codes");

router.get("/test-api", (req, res, next) => {
  try {
    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Welcome, Test API was initiated successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
});

module.exports = router;
