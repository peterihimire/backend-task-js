const { verify } = require("jsonwebtoken");
const httpStatusCodes = require("../utils/http-status-codes");
const BaseError = require("../utils/base-error");

const verifyToken = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  const authCookie = req.headers["cookie"];
  console.log("This is the auth cookie...", authCookie);

  if (authCookie) {
    // const token = authCookie.split(" ")[1];
    const token = authCookie.split("=")[1];
    console.log("This is the token...", token);
    verify(token, process.env.JWT_KEY, (err, user) => {
      if (err)
        return res
          .status(httpStatusCodes.FORBIDDEN)
          .json({ status: "fail", msg: "Expired or invalid token!" });
      req.user = user;
      next();
    });
  } else {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ status: "fail", msg: "You are not authenticated!" });
  }
};

// USER AUTHORIZATION
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === (req.params.userId || req.body.userId)) {
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
