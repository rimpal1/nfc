const express = require("express");
const routes = express.Router();
var moment = require("moment");
routes.use(express.json());
const db = require("../models");
const { Op, fn, col } = require("sequelize");

routes.get("/getAllProductsByVendorId/:vendorId", (req, res) => {
   db.vendor
      .findOne({
         include: [
            {
               model: db.product
            }
         ],
         where: {
            vendorId: {
               [Op.eq]: req.params.vendorId
            }
         }
      })
      .then((vendor) => {
         if (vendor) {
            res.status(200).json(vendor);
         } else {
            res.status(404).json({ status: "Not Found" });
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ status: "failure" });
      });
});

routes.get("/getMonthlyInvoices/:vendorId", (req, res) => {
   const firstDayOfMonth = moment().date(1); //format("YYYY-MM-DD")
   const currentDayOfMonth = moment();

   db.vendor
      .findOne({
         include: [
            {
               model: db.product
            }
         ],
         where: {
            vendorId: {
               [Op.eq]: req.params.vendorId
            }
         }
      })
      .then((vendor) => {
         const productIds = vendor.products.map((product) => {
            return product.productId;
         });
         db.productOrder
            .findAll({
               attributes: ["productId", [fn("SUM", col("quantity")), "totalQuantity"]],
               where: {
                  [Op.and]: [
                     {
                        productId: {
                           [Op.in]: productIds
                        }
                     },
                     {
                        createdAt: {
                           [Op.lt]: currentDayOfMonth,
                           [Op.gt]: firstDayOfMonth
                        }
                     }
                  ]
               },
               raw: true,
               group: "productId"
            })
            .then((orderProducts) => {
               const productQuantityMap = new Map();
               orderProducts.forEach((product) => {
                  productQuantityMap.set(product.productId, product.totalQuantity);
               });

               const finalReport = vendor.toJSON().products.map((product) => {
                  if (productQuantityMap.has(product.productId)) {
                     return {
                        ...product,
                        quantity: productQuantityMap.get(product.productId)
                     };
                  }
                  return { ...product, quantity: 0 };
               });
               res.status(200).json(finalReport);
            });
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ status: "failure" });
      });
});

routes.get("/topperformingproducts/:vendorId", (req, res) => {
   db.vendor
      .findOne({
         // attributes: ['foo', ['bar', 'baz'], 'qux'],
         include: [
            {
               model: db.product
            }
         ],
         where: {
            vendorId: {
               [Op.eq]: req.params.vendorId
            }
         }
      })
      .then((vendor) => {
         const productIds = vendor.products.map((product) => {
            return product.productId;
         });
         console.log(productIds, "productIds");

         db.productOrder
            .findAll({
               attributes: ["productId", [fn("SUM", col("quantity")), "TotalQuantity"]],
               where: {
                  productId: {
                     [Op.in]: productIds
                  }
               },
               group: "productId"
            })
            .then((orderProducts) => {
               res.status(200).json(orderProducts);
               console.log(orderProducts, "orderProducts----");
            });

         //  res.status(200).json(vendor);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ status: "failure" });
      });
});

module.exports = routes;
