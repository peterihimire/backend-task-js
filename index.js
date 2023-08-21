const mongoose = require("mongoose");
const PORT = process.env.PORT || 8040;
const HOST = "0.0.0.0";

const app = require("./app");

app.listen(PORT, function () {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

const connectWithRetry = () => {
  mongoose
    .connect(process.env.DB_HOST, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB database connected..."))
    .catch((err) => console.log(err));
};
connectWithRetry();
