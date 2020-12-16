module.exports = (sequelize, DataTypes) => {
   const order = sequelize.define("order", {
      orderId: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      totalCost: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      orderCancelDate: {
         type: DataTypes.DATE,
         allowNull: true
      }
   });

   order.associate = (models) => {
      order.belongsTo(models.customer, {
         foreignKey: {
            name: "customerId",
            allowNull: false
         }
      });
      order.hasOne(models.orderTracking, {
         foreignKey: {
            name: "orderId",
            allowNull: false
         }
      });
      order.belongsToMany(models.product, {
         through: models.productOrder,
         foreignKey: "orderId"
      });
   };

   return order;
};
