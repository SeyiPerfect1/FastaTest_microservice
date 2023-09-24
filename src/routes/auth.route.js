const express = require("express");
const {
  RegisterUser,
  VerifyUser,
  ResendVerificionLink,
  UserLogin,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", RegisterUser);
router.get("/confirm/:confirmation_code", VerifyUser);
router.post("/resend-confirm", ResendVerificionLink);
router.post("/login", UserLogin);

module.exports = router;
