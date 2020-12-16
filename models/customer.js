module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define("customer", {
    customerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    membershipStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "prime",
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  customer.associate = (models) => {
    customer.hasOne(models.login, {
      foreignKey: {
        name: "customerId",
        allowNull: true,
        unique: true,
      },
    });
    customer.hasMany(models.order, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
    });
    customer.hasMany(models.paymentDetail, {
      foreignKey: {
        name: "customerId",
        allowNull: true,
      },
    });
    customer.hasMany(models.address, {
      foreignKey: {
        name: "customerId",
        allowNull: true,
      },
    });
  };

  return customer;
};
