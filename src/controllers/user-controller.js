const BaseError = require("../utils/base-error");
const httpStatusCodes = require("../utils/http-status-codes");
const User = require("../models/User");

require("dotenv").config();

// @route POST api/users/dashboard
// @desc To view dashboard
// @access Private
const get_dashboard = async (req, res, next) => {
  const { userId } = req.body;
  const validObjectId = userId.match(/^[0-9a-fA-F]{24}$/);
  console.log("This is session user data...", userId);

  try {
    if (!validObjectId) {
      return next(new BaseError("Invalid ObjectId!", httpStatusCodes.CONFLICT));
    }

    const found_user = await User.find({ _id: userId });
    console.log(found_user);
    if (!found_user[0]) {
      return next(
        new BaseError("Account does not exist!", httpStatusCodes.CONFLICT)
      );
    }
    const name = found_user[0].username;

    res.status(200).json({
      status: "success",
      msg: "Dashboard info.",
      data: `Welcome to your dashboard, ${name}`,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

module.exports = {
  get_dashboard,
};
