const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/auth-handler");

const { get_dashboard } = require("../controllers/user-controller");

router.post("/dashboard", verifyTokenAndAuthorization, get_dashboard);

module.exports = router;
