const express = require("express");
const logger = require("morgan");
const path = require("path");
const AuthRoutes = require("./src/routes/auth.route");
const WalletRoutes = require("./src/routes/wallet.route");
const DonationRoutes = require("./src/routes/donation.route");

const helmet = require("helmet");

const app = express();

//  middleware to serve public files
app.use(express.static(path.join(__dirname, "./src/public")));

//  use body parsr middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// security middleware
app.use(helmet());

//  use logger middleware
app.use(logger("dev"));

//  set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// //  add routes
app.use("/api/auth", AuthRoutes);
app.use("/api/wallet", WalletRoutes);
app.use("/api/donations", DonationRoutes);

//  homepage route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome home",
  });
});

//  unavailable resources route
app.get("*", (req, res, next) => {
  try {
    res.status(404).json({
      message: "No page found, check url!!!",
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err.message,
  });
});

module.exports = app;
