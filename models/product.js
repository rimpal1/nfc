module.exports = (sequelize, DataTypes) => {
   const product = sequelize.define("product", {
      productId: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      productName: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      category: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      description: {
         type: DataTypes.STRING(2000),
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      price: {
         type: DataTypes.DOUBLE,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      color: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      inStock: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      imageUrl: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      }
   });

   product.associate = (models) => {
      product.belongsTo(models.vendor, {
         foreignKey: {
            name: "vendorId",
            allowNull: false
         }
      });
      product.hasMany(models.productFeedback, {
         foreignKey: {
            name: "productId",
            allowNull: false
         }
      });
      product.belongsToMany(models.order, {
         through: models.productOrder,
         foreignKey: "productId"
      });
   };

   return product;
};
