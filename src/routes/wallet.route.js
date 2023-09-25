const express = require("express");
const Authenticate = require("../middlewares/auth.middleware");
const {
  CreateWallet,
  GetWallet,
  CreateTransactionPin,
} = require("../controllers/wallet.controller");
const validation = require("../middlewares/validation.middleware");
const { create_transaction_pin } = require("../validation/wallet.validation");

const router = express.Router();

router.post("/", Authenticate, CreateWallet);
router.post("/create_pin", validation(create_transaction_pin), Authenticate, CreateTransactionPin);
router.get("/", Authenticate, GetWallet);

module.exports = router;
