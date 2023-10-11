const express = require("express");
const logger = require("morgan");
const path = require("path");
const AuthRoutes = require("./Routes/auth.route");
const fs = require("fs");
const winston = require("winston");
const { createLogger, format, transports } = winston;

const helmet = require("helmet");
const csp = require("helmet-csp");

const app = express();

// Set up CSP headers
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"], // Allow content from the same origin
      scriptSrc: ["'self'", "trusted-cdn.com"], // Allow inline scripts and scripts from a trusted CDN
      styleSrc: ["'self'", "trusted-cdn.com"], // Allow inline styles and styles from a trusted CDN
    },
  })
);

//  middleware to serve public files
app.use(express.static(path.join(__dirname, "./src/public")));

//  use body parsr middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// security middleware
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  // Logging configuration
  const accessLogger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.File({ filename: "access.log", level: "info" }),
    ],
  });

  const errorLogger = createLogger({
    level: "error",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
    ],
  });

  // Create a stream for Morgan to pipe logs to Winston and encryption
  const morganStream = {
    write: (message) => {
      if (message.includes("error")) {
        // Log error messages to errorLogger
        errorLogger.error(message.trim());
      } else {
        // Log non-error messages to accessLogger
        accessLogger.info(message.trim());
      }
    },
  };

  //  use logger middleware
  // log all requests to access.log
  app.use(
    logger("common", {
      stream: morganStream,
    })
  );
} else {
  app.use(logger("dev"));
}

//  set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// //  add routes
app.use("/api/auth", AuthRoutes);

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
  res.status(502).json({
    error: err.message,
  });
});

module.exports = app;
