"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.User, { as: "User", foreignKey: "user_id" });
    }
  }
  Wallet.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0, // Minimum wallet balance can be zero or more
        },
      },
      wallet_id: {
        type: DataTypes.String,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
