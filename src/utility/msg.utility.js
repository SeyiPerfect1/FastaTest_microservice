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

// special thank you message
const thank_you_message = (donor, amount, beneficiary) => {
  const msg = `<h1>Thank You ${donor.first_name} ${donor.last_name}</h1>
                <p>Thanks for your donation of ${amount} to ${beneficiary.first_name}!!!</p>`;
  const subject = `With Love, ${donor.first_name}`;

  return [msg, subject];
};

//add other messages here

module.exports = {
  confirmation_message,
  thank_you_message,
};
