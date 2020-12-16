module.exports = (sequelize, DataTypes) => {
  const orderTracking = sequelize.define("orderTracking", {
    orderTrackingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    shippedDate: {
      type: DataTypes.DATE,
    },
    estimatedDelivery: {
      type: DataTypes.DATE,
    },
  });

  orderTracking.associate = (models) => {
    orderTracking.belongsTo(models.order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };

  return orderTracking;
};
