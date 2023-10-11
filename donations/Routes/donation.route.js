const express = require("express");
const Authenticate = require("../middlewares/auth.middleware");
const {
  ConfirmDonation,
  VerifyBeneficiaryWallet,
  GetDonations,
  GetSingleDonation,
} = require("../controllers/donation.controller");
const validation = require("../middlewares/validation.middleware");
const {
  verify_beneficiary_wallet,
  confirm_donation,
} = require("../validation/donation.validation");

const router = express.Router();

router.put(
  "/confirm",
  validation(confirm_donation),
  Authenticate,
  ConfirmDonation
);
router.get(
  "/verify_beneficiary",
  validation(verify_beneficiary_wallet),
  Authenticate,
  VerifyBeneficiaryWallet
);
router.get("/:donation_id", Authenticate, GetSingleDonation);
router.get("/", Authenticate, GetDonations);

module.exports = router;
