const nodemailer = require("nodemailer");
require("dotenv").config();
const log = require("./logger");

const transport = nodemailer.createTransport({
  service: `${process.env.MAIL_SERVICE}`,
  host: `${process.env.MAIL_HOST}`,
  port: +`${process.env.MAIL_PORT}`,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const send_email = async (email, subject, message) => {
  try {
    return await transport.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject,
      html: message,
    });
  } catch (error) {
    log.error(error.message);
  }
};

module.exports = send_email;
