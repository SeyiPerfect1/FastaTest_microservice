"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      User.hasOne(models.Wallet, { foreignKey: "user_id" });
    }

    // Define a pre-hook to hash the password before saving
    static async beforeCreate(user) {
      const hashedPassword = await bcrypt.hash(
        user.password,
        +process.env.HASH_SALT
      );
      user.password = hashedPassword;
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        lowercase: true, // Convert email to lowercase before saving
        trim: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      confirmation_code: {
        type: DataTypes.STRING,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
      transaction_pin: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        // Define a pre-hook to hash the password before saving
        async beforeCreate(user) {
          try {
            const hashedPassword = await bcrypt.hash(
              user.password,
              +process.env.HASH_SALT
            );
            user.password = hashedPassword;
          } catch (error) {
            console.error("Error in before create hook:", error);
            throw error;
          }
        },
      },
    }
  );
  return User;
};
