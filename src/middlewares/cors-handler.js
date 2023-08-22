require("dotenv").config();

const corsOptions = {
  origin: [process.env.CORS_ORIGIN],
  methods: ["*"],
  allowedHeaders: ["*"],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions };
