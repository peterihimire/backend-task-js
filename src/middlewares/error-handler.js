const BaseError = require("../utils/base-error");
const httpStatusCodes = require("../utils/http-status-codes");

function logError(err) {
  console.error(`error: ${err.message}, status: ${err.code}`);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }

  res.status(err.code || 500);
  res.json({
    status: "fail",
    msg: err.message || "An unknown error occurred !",
  });
}

function unknownRoute(req, res, next) {
  try {
    return next(
      new BaseError(
        "Could not find this route, make sure the URL is correct !",
        httpStatusCodes.NOT_FOUND
      )
    );
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  unknownRoute,
};
