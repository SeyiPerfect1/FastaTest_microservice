const z = require("zod");

const create_transaction_pin = z.object({
  body: z.object({
    transaction_pin: z
      .string()
      .length(4, {
        required_error: "Transaction PIN can not be less than or greater than 4",
      })
      .refine((value) => value.trim() !== "", {
        required_error: "transaction pin cannot be empty",
      }),
  }),
});

module.exports = { create_transaction_pin };
