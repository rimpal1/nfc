module.exports = (sequelize, DataTypes) => {
  const vendor = sequelize.define("vendor", {
    vendorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fullfilmentRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: true,
      },
    },
  });

  vendor.associate = (models) => {
    vendor.hasOne(models.address, {
      foreignKey: {
        name: "vendorId",
        allowNull: true,
        unique: true,
      },
    });
    vendor.hasOne(models.login, {
      foreignKey: {
        name: "vendorId",
        allowNull: true,
        unique: true,
      },
    });
    vendor.hasMany(models.product, {
      foreignKey: {
        name: "vendorId",
        allowNull: false,
      },
    });
    vendor.belongsTo(models.warehouse, {
      foreignKey: {
        name: "warehouseId",
        allowNull: false,
      },
    });
    vendor.hasMany(models.vendorBalance, {
      foreignKey: {
        name: "vendorId",
        allowNull: false,
      },
    });
    vendor.hasMany(models.paymentDetail, {
      foreignKey: {
        name: "vendorId",
        allowNull: true,
      },
    });
  };

  return vendor;
};
