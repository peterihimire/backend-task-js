const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { hashPassword, comparePassword } = require("../utils/helpers");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
const BaseError = require("../utils/base-error");
const httpStatusCodes = require("../utils/http-status-codes");

// @route POST api/auth/register
// @desc verify email
// @access Public
const register = async (req, res, next) => {
  const { username } = req.body;
  const originalPassword = req.body.password;

  try {
    if (!originalPassword) {
      return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
        status: "fail",
        msg: "Password missing required field.",
      });
    }

    if (!username) {
      return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
        status: "fail",
        msg: "Username missing required field.",
      });
    }

    const foundUser = await User.findOne({
      username: username,
    });

    if (foundUser) {
      return next(
        new BaseError(
          "Account already exist, login instead .",
          httpStatusCodes.BAD_REQUEST
        )
      );
    }

    const hashedPassword = hashPassword(originalPassword);

    const createdUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    const { password, __v, ...others } = createdUser._doc;

    res.status(httpStatusCodes.CREATED).json({
      status: "success",
      msg: "Account created!",
      data: others,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc login user
// @access Public
const login = async (req, res, next) => {
  // const { username } = req.body;
  const originalUsername = req.body.username;
  const originalPassword = req.body.password;

  try {
    const existingUser = await User.findOne({
      username: originalUsername,
    });
    if (!existingUser) {
      return next(
        new BaseError(
          "Account does not exist , please signup for an account .",
          httpStatusCodes.UNPROCESSABLE_ENTITY
        )
      );
    }

    // const hashedPassword = await bcrypt.compare(
    //   originalPassword,
    //   existingUser.password
    // );

    const hashedPassword = comparePassword(
      originalPassword,
      existingUser.password
    );
    if (!hashedPassword) {
      return next(
        new BaseError(
          "Wrong password or username!",
          httpStatusCodes.UNPROCESSABLE_ENTITY
        )
      );
    }
    const token = sign(
      {
        username: existingUser.username,
        id: existingUser.id,
      },
      process.env.JWT_KEY,
      { expiresIn: "5m" }
    );

    const { password, createdAt, updatedAt, __v, ...others } =
      existingUser._doc;

    res
      .cookie("accessToken", token, {
        secure: false,
        httpOnly: true, //cannot be accessed by javascript
        maxAge: 1000 * 60 * 5, //expires in 5 minutes
      })
      .status(httpStatusCodes.OK)
      .json({
        status: "success",
        msg: "You are logged in!",
        data: { ...others },
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/logout
// @desc To logout an account
// @access Private
const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(httpStatusCodes.OK)
    .json({
      status: "success",
      msg: "You are logged out!",
    });
};

module.exports = { register, login, logout };
