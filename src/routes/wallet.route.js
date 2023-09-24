const express = require("express");
const Authenticate = require("../middlewares/auth.middleware");
const {
  CreateWallet,
  GetWallet,
  CreateTransactionPin,
} = require("../controllers/wallet.controller");

const router = express.Router();

router.post("/", Authenticate, CreateWallet);
router.post("/create_pin", Authenticate, CreateTransactionPin);
router.get("/", Authenticate, GetWallet);

module.exports = router;
