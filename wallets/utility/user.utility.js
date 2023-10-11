const otpGenerator = require("otp-generator");

const GenCode = async () => {
  return await otpGenerator.generate(12, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

const isUUID = (uuid) => {
  let s = "" + uuid;

  s = s.match(
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  if (s === null) {
    return false;
  }
  return true;
};

module.exports = { GenCode, isUUID };
