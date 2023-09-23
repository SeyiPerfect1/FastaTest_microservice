const otpGenerator = require("otp-generator");

export const GenCode = async () => {
  return await otpGenerator.generate(32, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

module.exports = GenCode;
