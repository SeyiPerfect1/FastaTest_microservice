"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Donation.belongsTo(models.Wallet, {
      //   as: "Donor",
      //   foreignKey: "donor_id",
      // });
      // Donation.belongsTo(models.Wallet, {
      //   as: "Beneficiary",
      //   foreignKey: "beneficiary_id",
      // });
    }
  }
  Donation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Donation",
    }
  );
  return Donation;
};
