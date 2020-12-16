module.exports = (sequelize, DataTypes) => {
  const warehouseEmployee = sequelize.define("warehouseEmployee", {
    warehouseEmployeeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jobTitle: {
      type: DataTypes.STRING,
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
  });

  warehouseEmployee.associate = (models) => {
    warehouseEmployee.hasOne(models.address, {
      foreignKey: {
        name: "warehouseEmployeeId",
        allowNull: true,
        unique: true,
      },
    });
    warehouseEmployee.belongsTo(models.warehouse, {
      foreignKey: {
        name: "warehouseId",
        allowNull: false,
      },
    });
  };

  return warehouseEmployee;
};
