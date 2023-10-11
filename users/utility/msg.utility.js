require("dotenv").config();

// user'sconfirmation email
const confirmation_message = (user) => {
  const msg = `<h1>Email Confirmation</h1>
<h2>Hello ${user.first_name} ${user.last_name}</h2>
<p>Verify your email address to complete the signup and login to your account</p>
<a href=${process.env.BASE_URL}/api/auth/confirm/${user?.confirmation_code}> Click here</a>`;

  const subject = "Please confirm your account";

  return [msg, subject];
};

//add other messages here

module.exports = {
  confirmation_message,
};
