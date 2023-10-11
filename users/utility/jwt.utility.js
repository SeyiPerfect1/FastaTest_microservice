require("dotenv").config();
const jwt = require("jsonwebtoken");
const log = require("../utility/logger");

const ValidateJwt = async (req) => {
  try {
    const signature = req.get("Authorization");

    if (signature) {
      const payload = jwt.verify(
        signature.split(" ")[1],
        process.env.JWT_SECRET
      );
      req.user = payload;

      return true;
    }

    return false;
  } catch (error) {
    log.error(error);
  }
};

const genToken = async (data) => {
  let token;
  // generate new jwt token for registeration
  token = jwt.sign(
    {
      ...data,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const signToken = async (data) => {
  try {
    const token = await genToken({
      ...data,
    });

    return token;
  } catch (error) {
    log.error(error);
  }
};

module.exports = {
  ValidateJwt,
  signToken,
};
