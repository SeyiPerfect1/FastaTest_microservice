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
      Wallet.hasMany(models.Donation, { foreignKey: "donor_id" });
      Wallet.hasMany(models.Donation, { foreignKey: "beneficiary_id" });
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
        defaultValue: 0.0,
      },
      wallet_id: {
        type: DataTypes.STRING,
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
