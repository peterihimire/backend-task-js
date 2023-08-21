const BaseError = require("../utils/base-error");
const httpStatusCodes = require("../utils/http-status-codes");
const db = require("../database/models");
const User = db.User;

require("dotenv").config();

// @route POST api/auth/register
// @desc To create an account
// @access Public
const get_dashboard = async (req, res, next) => {
  const { user } = req.session;
  const phone = user.phone;
  const prefix = user.prefix;
  const { api_key, auth_stamp } = req.body;

  console.log("This is session user data...", user);

  try {
    const found_user = await User.findOne({
      attributes: ["phone"],
      where: { phone: phone },
    });

    if (!found_user) {
      return next(
        new BaseError("Account does not exist!", httpStatusCodes.CONFLICT)
      );
    }
    const found_country = await Country.findOne({
      where: { prefix: prefix },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
      include: [
        {
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          model: Service,
          through: {
            attributes: [],
          },
          include: [
            {
              attributes: { exclude: ["id", "createdAt", "updatedAt"] },
              model: SubService,
            },
          ],
        },
      ],
    });

    if (!found_country) {
      return next(
        new BaseError(`Country with prefix ${prefix} does not exist.`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      msg: "Country details.",
      data: found_country,
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
