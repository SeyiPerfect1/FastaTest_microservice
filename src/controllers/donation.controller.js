const DonationModel = require("../../models").Donation;
const WalletModel = require("../../models").Wallet;
const UserModel = require("../../models").User;
const bcrypt = require("bcrypt");
const send_email = require("../utility/mailer.utility");
const { thank_you_message } = require("../utility/msg.utility");
const build_query = require("../utility/pagaination");
const log = require("../utility/logger");
const { isUUID } = require("../utility/user.utility");

/**
 * @description verify benficiary details
 * @method GET
 * @route /api/donation/verify_beneficiary
 * @access public
 */
const VerifyBeneficiaryWallet = async (req, res) => {
  try {

    const { beneficiary_wallet_id } = req.body;

    // Verify the beneficiary's wallet and retrieve user details
    const beneficiary_wallet = await WalletModel.findOne({
      where: { wallet_id: beneficiary_wallet_id },
      include: {
        model: UserModel,
        as: "User",
      },
      attributes: {
        attributes: {
          exclude: ["password", "transaction_pin", "created_at", "updated_at"],
        },
      },
    });

    if (!beneficiary_wallet) {
      return res.status(404).json({ message: "Beneficiary wallet not found." });
    }

    if (beneficiary_wallet.user_id === req.user.id) {
      return res
        .status(400)
        .json({ message: "you cannot make donations to yourself" });
    }

    res.status(200).json({ beneficiary: beneficiary_wallet.User });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @description confirm Donation with transaction pin
 * @method POST
 * @route /api/donations/confirm
 * @access public
 */
const ConfirmDonation = async (req, res) => {
  try {

    const { beneficiary_wallet_id, amount, transaction_pin } = req.body;

    // Verify the beneficiary's wallet and retrieve user details
    const beneficiary_wallet = await WalletModel.findOne({
      where: { wallet_id: beneficiary_wallet_id },
      include: {
        model: UserModel,
        as: "User",
      },
    });

    if (!beneficiary_wallet) {
      return res.status(404).json({ message: "Beneficiary wallet not found." });
    }

    const donor_wallet = await WalletModel.findOne({
      where: { user_id: req.user.id },
      include: {
        model: UserModel,
        as: "User",
      },
    });

    if (donor_wallet.User.transaction_pin === null) {
      return res
        .status(402)
        .json({ message: "you don't have a transction pin" });
    }

    if (donor_wallet.balance < +amount || donor_wallet.balance == 0) {
      return res
        .status(401)
        .json({ message: "you do not have enough to donate" });
    }

    // compare the transaction pin provided with the one in the database
    const is_transaction_pin_valid = await bcrypt.compare(
      transaction_pin,
      donor_wallet.User.transaction_pin
    );
    if (!is_transaction_pin_valid) {
      return res.status(403).json({ message: "Invalid transaction pin." });
    }

    // Create the donation
    const donation = await DonationModel.create({
      donor_id: donor_wallet.id,
      beneficiary_id: beneficiary_wallet.id,
      amount: amount,
    });

    // minus amount of donation from donor's wallet
    donor_wallet.balance -= +amount;
    await donor_wallet.save();

    // add donation in beneficiary wallet
    beneficiary_wallet.balance += +amount;
    await beneficiary_wallet.save();

    // send msg to the donor if donation is more than two the same person
    const { count } = await DonationModel.findAndCountAll({
      where: {
        donor_id: donor_wallet.id,
        beneficiary_id: beneficiary_wallet.id,
      },
    });

    if (count >= 2) {
      const message = thank_you_message(
        donor_wallet.User,
        amount,
        beneficiary_wallet.User
      );

      await send_email(donor_wallet.User.email, message[1], message[0]);
    }

    res.status(200).json({ message: "donation successful", donation });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @description get donations
 * @method GET
 * @route /api/donations
 * @access public
 */
const GetDonations = async (req, res) => {
  try {
    const wallet = await WalletModel.findOne({
      where: { user_id: req.user.id },
    });

    if (!wallet) {
      return res.status(401).json({ message: "you don't have a wallet yet" });
    }
    const where_clause = {
      donor_id: wallet.id,
    };

    const query_options = await build_query(req.query, where_clause);

    const { count: total_donations, rows: donations } =
      await DonationModel.findAndCountAll(query_options[0]);

    if (total_donations === 0) {
      return res.status(404).json({ message: "You haven't made any donation" });
    }

    res.status(200).json({
      message: "Donations queried successfully!",
      total_donations,
      page: query_options[1],
      limit: query_options[2],
      donations,
    });
  } catch (error) {
    log.error(error);
    res.status(500).send({ message: "'Error retrieving donation'" });
  }
};

/**
 * @description get a single donation by the donor
 * @method GET
 * @route /api/donations/donation_id
 * @access public
 */
const GetSingleDonation = async (req, res) => {
  try {

    const { donation_id } = req.params;

    if (!isUUID(donation_id)) {
      return res.status(400).json({ message: "Invalid donation ID" });
    }

    const donation = await DonationModel.findOne({
      where: { id: donation_id },
      include: [
        {
          model: WalletModel,
          as: "Donor",
          attributes: ["id"],
          include: [
            {
              model: UserModel,
              as: "User",
              attributes: ["id"],
            },
          ],
        },
      ],
    });

    if (donation.User.id !== req.user.id) {
      return res
        .status(401)
        .json({ message: "you are not the owner of this donation" });
    }

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res
      .status(200)
      .json({ message: "Donation queried successfully!", donation });
  } catch (error) {
    log.error(error);
    res.status(500).send({ message: "'Error retrieving donation'" });
  }
};

module.exports = {
  VerifyBeneficiaryWallet,
  ConfirmDonation,
  GetDonations,
  GetSingleDonation,
};
