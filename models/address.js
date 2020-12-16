module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define("address", {
    addressId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    addressType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  address.associate = (models) => {
    address.belongsTo(models.customer, {
      foreignKey: {
        name: "customerId",
        allowNull: true,
      },
    });
    address.belongsTo(models.vendor, {
      foreignKey: {
        name: "vendorId",
        allowNull: true,
        unique: true,
      },
    });
    address.belongsTo(models.warehouse, {
      foreignKey: {
        name: "warehouseId",
        allowNull: true,
        unique: true,
      },
    });
    address.belongsTo(models.warehouseEmployee, {
      foreignKey: {
        name: "warehouseEmployeeId",
        allowNull: true,
        unique: true,
      },
    });
  };

  return address;
};
