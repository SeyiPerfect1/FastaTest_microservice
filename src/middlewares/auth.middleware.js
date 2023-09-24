const { ValidateJwt } = require("../utility/jwt.utility");

const Authenticate = async (req, res, next) => {
  const validate = await ValidateJwt(req);

  if (validate) {
    next();
  } else {
    return res.status(400).json({
      message: "User not Authenticated",
    });
  }
};

module.exports = Authenticate;
