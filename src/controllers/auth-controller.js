const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const BaseError = require("../utils/base-error");
const httpStatusCodes = require("../utils/http-status-codes");

// @route POST api/auth/verify-email
// @desc verify email
// @access Public
const register = async (req, res, next) => {
  console.log(process.env.SENDGRID_API_KEY);
  const { username, password } = req.body;

  try {
    if (!password) {
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
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username: username,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    console.log(createdUser);
    res.status(httpStatusCodes.CREATED).json({
      status: "success",
      msg: "Account created!",
      data: createdUser,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/verify-email
// @desc verify email
// @access Public
const login = async (req, res, next) => {
  const { username } = req.body;
  const originalPassword = req.body.password;

  try {
    const existingUser = await User.findOne({
      email: username,
    });
    if (!existingUser) {
      return next(
        new BaseError(
          "Account does not exist , please signup for an account .",
          httpStatusCodes.UNPROCESSABLE_ENTITY
        )
      );
    }

    const hashedPassword = await bcrypt.compare(
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
      { expiresIn: "1h" }
    );
    // Destructures out password from the existing-user object
    const { password, isAdmin, ...others } = existingUser._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(httpStatusCodes.OK)
      .json({
        status: "success",
        msg: "You are logged in!",
        data: { ...others, token },
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
