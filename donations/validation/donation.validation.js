const z = require("zod");

const verify_beneficiary_wallet = z.object({
  body: z.object({
    beneficiary_wallet_id: z
      .string()
      .length(12)
      .refine((value) => value.trim() !== "", {
        required_error: "beneficairy wallet id cannot be empty",
      }),
  }),
});

const confirm_donation = z.object({
  body: z.object({
    beneficiary_wallet_id: z
      .string()
      .length(12)
      .refine((value) => value.trim() !== "", {
        required_error: "beneficairy wallet id cannot be empty",
      }),
    amount: z.coerce.number().positive(),
    transaction_pin: z
      .string()
      .length(4, {
        required_error:
          "Transaction PIN can not be less than or greater than 4",
      })
      .refine((value) => value.trim() !== "", {
        required_error: "transaction pin wallet id cannot be empty",
      }),
  }),
});

module.exports = {
  verify_beneficiary_wallet,
  confirm_donation,
};
