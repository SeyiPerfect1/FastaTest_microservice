const express = require("express");
const {
  RegisterUser,
  VerifyUser,
  ResendVerificionLink,
  UserLogin,
} = require("../controllers/auth.controller");
const validation = require("../middlewares/validation.middleware");
const {
  user_registration,
  user_login,
  user_resend_cofirm,
} = require("../validation/auth.validation");

const router = express.Router();

router.post("/register", validation(user_registration), RegisterUser);
router.get("/confirm/:confirmation_code", VerifyUser);
router.post(
  "/resend-confirm",
  validation(user_resend_cofirm),
  ResendVerificionLink
);
router.post("/login", validation(user_login), UserLogin);

module.exports = router;
