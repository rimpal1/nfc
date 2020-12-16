module.exports = (sequelize, DataTypes) => {
  const paymentDetail = sequelize.define("paymentDetail", {
    paymentDetailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cardExpiry: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cardCvcCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  paymentDetail.associate = (models) => {
    paymentDetail.belongsTo(models.customer, {
      foreignKey: {
        name: "customerId",
        allowNull: true,
      },
    });
    paymentDetail.belongsTo(models.vendor, {
      foreignKey: {
        name: "vendorId",
        allowNull: true,
      },
    });
  };

  return paymentDetail;
};
