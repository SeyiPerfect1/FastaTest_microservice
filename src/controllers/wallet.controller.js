const { GenCode } = require("../utility/user.utility");
require("dotenv").config();
const bcrypt = require("bcrypt");
const log = require("../utility/logger");
const WalletModel = require("../../models/").Wallet;
const UserModel = require("../../models").User;

/**
 * @description create wallet
 * @method POST
 * @route /api/wallet
 * @access public
 */
const CreateWallet = async (req, res) => {
  try {
    const user_wallet = await WalletModel.findOne({
      where: { user_id: req.user.id },
    });

    if (user_wallet) {
      return res.status(401).json({ message: "user already has a wallet" });
    }

    const wallet_id = await GenCode();

    const wallet = await WalletModel.create({
      user_id: req.user.id,
      wallet_id: wallet_id,
    });

    if (!wallet) {
      return res.status(400).json({ message: "wallet failed to create" });
    }

    res.status(201).json({ message: "wallet created successfully!", wallet });
  } catch (error) {
    log.error(error);
    res.status(500).send({ message: "'Error creating wallet'" });
  }
};

/**
 * @description get wallet
 * @method GET
 * @route /api/wallet
 * @access public
 */
const GetWallet = async (req, res) => {
  try {
    // Find the wallet with the associated user information
    const wallet = await WalletModel.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: UserModel,
          as: "User",
          attributes: {
            exclude: ["password", "transaction_pin", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(200).json({ message: "wallet created successfully!", wallet });
  } catch (error) {
    log.error(error);
    res.status(500).send({ message: "'Error retrieving wallet'" });
  }
};

/**
 * @description create transaction pin
 * @method POST
 * @route /api/wallet/create_pin
 * @access public
 */
const CreateTransactionPin = async (req, res) => {
  try {
    const { transaction_pin } = req.body;

    // Find the user by userId
    const user = await UserModel.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const user_wallet = await WalletModel.findOne({
      where: { user_id: req.user.id },
    });

    if (!user_wallet) {
      return res
        .status(401)
        .json({ message: "You do not have a wallet page yet, create one" });
    }

    // Update the user's transactionPin
    const hashed_pin = await bcrypt.hash(
      transaction_pin,
      +process.env.HASH_SALT
    );
    user.transaction_pin = hashed_pin;
    await user.save();

    res.status(201).json({ message: "Transaction PIN created successfully" });
  } catch (error) {
    log.error(error);
    res.status(500).json({ error: "Error creating transaction PIN" });
  }
};

module.exports = {
  CreateWallet,
  GetWallet,
  CreateTransactionPin,
};
