const { verify } = require("jsonwebtoken");
const httpStatusCodes = require("./http-status-codes");
const BaseError = require("../utils/base-error");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_KEY, (err, user) => {
      if (err)
        return res
          .status(httpStatusCodes.FORBIDDEN)
          .json("Expired or invalid token!");
      req.user = user;
      next();
    });
  } else {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json("You are not authenticated!");
  }
};

// USER AUTHORIZATION
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId) {
      next();
    } else {
      return next(
        new BaseError(
          "You are not authorized to perform this operation!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
