const express = require("express");
const Authenticate = require("../middlewares/auth.middleware");
const {
  ConfirmDonation,
  VerifyBeneficiaryWallet,
  GetDonations,
  GetSingleDonation,
} = require("../controllers/donation.controller");

const router = express.Router();

router.put("/confirm", Authenticate, ConfirmDonation);
router.get("/verify_beneficiary", Authenticate, VerifyBeneficiaryWallet);
router.get("/:donation_id", Authenticate, GetSingleDonation);
router.get("/", Authenticate, GetDonations);

module.exports = router;
