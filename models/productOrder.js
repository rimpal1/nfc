module.exports = (sequelize, DataTypes) => {
   const productOrder = sequelize.define("productOrder", {
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      }
   });

   return productOrder;
};
