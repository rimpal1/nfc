module.exports = (sequelize, DataTypes) => {
  const login = sequelize.define("login", {
    loginId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  login.associate = (models) => {
    login.belongsTo(models.warehouse, {
      foreignKey: {
        name: "warehouseId",
        allowNull: true,
        unique: true,
      },
    });
    login.belongsTo(models.vendor, {
      foreignKey: {
        name: "vendorId",
        allowNull: true,
        unique: true,
      },
    });
    login.belongsTo(models.customer, {
      foreignKey: {
        name: "customerId",
        allowNull: true,
        unique: true,
      },
    });
  };

  return login;
};
