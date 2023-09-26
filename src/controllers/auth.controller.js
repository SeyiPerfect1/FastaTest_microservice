const UserModel = require("../../models").User;
const WalletModel = require("../../models/").Wallet;
const { GenCode } = require("../utility/user.utility");
const send_email = require("../utility/mailer.utility");
const { confirmation_message } = require("../utility/msg.utility");
const bcrypt = require("bcrypt");
const log = require("../utility/logger");
const { signToken } = require("../utility/jwt.utility");

/**
 * @description User registration
 * @method POST
 * @route /api/auth/register
 * @access public
 */

const RegisterUser = async (req, res) => {
  try {
    const { first_name, last_name, password, email } = req.body;
    // check if user already exists in the database

    const existUser = await UserModel.findOne({
      where: { email: email.toLowerCase() },
    });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //if user does not exist create user
    const user = await UserModel.create({
      first_name,
      last_name,
      password,
      email: email.toLowerCase(),
      confirmation_code: await GenCode(),
    });

    const wallet_id = await GenCode();

    await WalletModel.create({
      user_id: user.id,
      wallet_id: wallet_id,
    });

    //send confirmation code to user's email
    const message = confirmation_message(user);
    let ress = await send_email(user?.email, message[1], message[0]);

    if (ress !== null) {
      res.status(201).json({
        msg: "User created successfully! Please check your mail",
        wallet: wallet_id,
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong! Please try again");
    }
  } catch (error) {
    log.error(error);
    res.status(500).send({ msg: "Something went wrong! Please try again" });
  }
};

/**
 * @description Verify User account
 * @method GET
 * @route /api/auth/confirm/:confirmationCode
 * @access public
 */
const VerifyUser = async (req, res) => {
  try {
    const { confirmation_code } = req.params;
    const confirm_user = await UserModel.findOne({ confirmation_code });
    if (confirm_user === null) {
      res.status(400).send({ msg: "Invalid Verification Code" });
      return;
    }
    confirm_user.status = "Active";
    confirm_user.confirmation_code = "";

    await confirm_user.save();

    res.status(200).json({
      msg: "Verification Successful.You can now login",
    });
  } catch (error) {
    log.error(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

/**
 * @description Resend verification link to User's email
 * @method POST
 * @route /api/auth/resend-confirm
 * @access public
 */
const ResendVerificionLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(400).send({ msg: "User does not exist" });
      return;
    }

    if (user.status === "Active") {
      return res.status(401).json({
        msg: "user already verified",
      });
    }

    //send confirmation code to user's email
    const message = confirmation_message(user);
    let ress = await send_email(user?.email, message[1], message[0]);

    if (ress !== null) {
      res.status(200).json({
        msg: "Verification link sent, kindly check your mail",
      });
      return;
    } else {
      return res.status(403).json({
        msg: "Something went wrong! Email not sent, Please try again",
      });
    }
  } catch (error) {
    log.error(error);
    res
      .status(500)
      .send({ msg: "Something went wrong! Please try again", error });
  }
};

/*
 *@description Login into User account
 *@static
 * @method POST
 * @route /api/auth/login
 *@param  {Object} req - request
 *@param  {object} res - response
 *@returns {object} token, details
 */

const UserLogin = async (req, res) => {
  // retrieve the email and password from the request body
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(401).send({ message: "Kindly fill all required information" });
    }
    // find the email and check if they exist.
    const user = await UserModel.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unable to login, Invalid email or  password" });
    }

    // Check if the user's email is set to active.
    if (user.status !== "Active") {
      return res
        .status(400)
        .json({ message: "your email is yet to be verified" });
    }

    // compare the password
    const check_password = await bcrypt.compare(password, user.password);
    if (!check_password) {
      return res
        .status(401)
        .json({ message: "Unable to login, Invalid email or  password" });
    }

    console.log(user.id);
    return res.status(200).json({
      message: "User login successfully",
      id: user?.id,
      firstname: user?.first_name,
      lastname: user?.last_name,
      email: user?.email,
      token: await signToken({ id: user.id }),
    });
  } catch (error) {
    log.error(error);
    return res.status(500).json({
      message: "An Error Occured",
      error: error.error,
    });
  }
};

module.exports = {
  RegisterUser,
  VerifyUser,
  ResendVerificionLink,
  UserLogin,
};
