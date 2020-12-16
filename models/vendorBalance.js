module.exports = (sequelize, DataTypes) => {
  const vendorBalance = sequelize.define("vendorBalance", {
    vendorBalanceId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance_due: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    invoiceStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    invoiceStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    datePaid: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  vendorBalance.associate = (models) => {
    vendorBalance.belongsTo(models.vendor, {
      foreignKey: {
        name: "vendorId",
        allowNull: false,
      },
    });
  };

  return vendorBalance;
};
