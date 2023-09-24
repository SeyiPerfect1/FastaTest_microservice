require("dotenv").config();
const jwt = require("jsonwebtoken");

const ValidateJwt = async (req) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = jwt.verify(signature.split(" ")[1], process.env.JWT_SECRET);
    req.user = payload;

    return true;
  }

  return false;
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
  const token = await genToken({
    ...data,
  });

  return token;
};

module.exports = {
  ValidateJwt,
  signToken,
};
