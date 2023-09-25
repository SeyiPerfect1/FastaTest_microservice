const z = require("zod");

const user_registration = z.object({
  body: z.object({
    first_name: z.string().refine((value) => value.trim() !== "", {
      required_error: "firstname cannot be empty",
    }),
    last_name: z.string().refine((value) => value.trim() !== "", {
      required_error: "lastname cannot be empty",
    }),
    email: z
      .string()
      .email({ required_error: "Invalid email address" })
      .refine((value) => value.trim() !== "", {
        required_error: "email cannot be empty",
      }),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
        required_error:
          "Password must contain at least a character, sn alphabet, and a number",
      })
      .refine((value) => value.trim() !== "", {
        required_error: "password cannot be empty",
      }),
  }),
});

const user_login = z.object({
  body: z.object({
    email: z
      .string()
      .email({ required_error: "Invalid email address" })
      .refine((value) => value.trim() !== "", {
        required_error: "email cannot be empty",
      }),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
        required_error:
          "Password must contain at least a character, sn alphabet, and a number",
      })
      .refine((value) => value.trim() !== "", {
        required_error: "password cannot be empty",
      }),
  }),
});

const user_resend_cofirm = z.object({
  body: z.object({
    email: z
      .string()
      .email({required_error: "Invalid email address" })
      .refine((value) => value.trim() !== "", {
        required_error: "email cannot be empty",
      }),
  }),
});

module.exports = {
  user_registration,
  user_login,
  user_resend_cofirm,
};
