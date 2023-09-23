dotenv.config({ path: path.resolve(__dirname, "../.env") });
const User = require("../../models/user");

// user'sconfirmation email
const confirmation_message = {
  message: `<h1>Email Confirmation</h1>
            <h2>Hello ${User.first_name} ${User.last_name}</h2>
            <p>Verify your email address to complete the signup and login to your account</p>
            <a href=${process.env.BASE_URL}/api/confirm/${User?.confirmation_code}> Click here</a>`,
  subject: "Please confirm your account",
};

// special thank you message
const thank_you_message = {
  message: `<h1>Thank You ${User.first_name}</h1>
                <p>Thanks for your donation of ${amount} to ${User.firstname}!!!</p>`,
  subject: `With Love, ${User.first_name}`,
};

//add other messages here

module.exports = {
  confirmation_message,
  thank_you_message,
};
