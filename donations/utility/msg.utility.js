require("dotenv").config();

// special thank you message
const thank_you_message = (donor, amount, beneficiary) => {
  const msg = `<h1>Thank You ${donor.first_name} ${donor.last_name}</h1>
                <p>Thanks for your donation of ${amount} to ${beneficiary.first_name}!!!</p>`;
  const subject = `With Love, ${donor.first_name}`;

  return [msg, subject];
};

//add other messages here

module.exports = {
  thank_you_message,
};
