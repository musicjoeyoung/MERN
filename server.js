const express = require("express");
const dotenv = require("dotenv"); //manages configuration info (DB credentials, API keys, & other sensitive info that shouldn't be stored in code)
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const user = require("./routes/user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  /* res.header("Access-Control-Allow-Origin", "http://localhost:3000");*/
  res.header(
    "Access-Control-Allow-Origin",
    "https://dapper-licorice-657a3f.netlify.app/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 5001;

app.use(logger);
app.use("/user", user);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
