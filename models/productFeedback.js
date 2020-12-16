module.exports = (sequelize, DataTypes) => {
   const productFeedback = sequelize.define("productFeedback", {
      productFeedbackId: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      rating: {
         type: DataTypes.FLOAT,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      }
   });

   productFeedback.associate = (models) => {
      productFeedback.belongsTo(models.product, {
         foreignKey: {
            name: "productId",
            allowNull: false
         }
      });
   };

   return productFeedback;
};
