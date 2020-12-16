module.exports = (sequelize, DataTypes) => {
  const warehouse = sequelize.define("warehouse", {
    warehouseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    remainingStorage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalStorage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalShelves: {
      type: DataTypes.INTEGER,
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  warehouse.associate = (models) => {
    warehouse.hasOne(models.address, {
      foreignKey: {
        name: "warehouseId",
        allowNull: true,
        unique: true,
      },
    });
    warehouse.hasOne(models.login, {
      foreignKey: {
        name: "warehouseId",
        allowNull: true,
        unique: true,
      },
    });
    warehouse.hasMany(models.warehouseEmployee, {
      foreignKey: {
        name: "warehouseId",
        allowNull: false,
      },
    });
    warehouse.hasMany(models.vendor, {
      foreignKey: {
        name: "warehouseId",
        allowNull: false,
      },
    });
  };

  return warehouse;
};
