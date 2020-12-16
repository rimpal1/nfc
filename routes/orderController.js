const express = require("express");
const routes = express.Router();
routes.use(express.json());
const db = require("../models");
const { Op } = require("sequelize");

// warehouse - get all orders from everywhere
routes.get("/getAllOrder", (req, res) => {
   db.order
      .findAll({
         include: [
            {
               model: db.product
            }
         ]
      })
      .then((products) => res.send(products));
});

routes.post("/create", async (req, res) => {
   if (req && req.body) {
      const { totalCost, customerId, products } = req.body;
      console.log(JSON.stringify(req.body));

      try {
         await db.sequelize.transaction(async (t) => {
            products.forEach((product) => {
               db.product.decrement("inStock", {
                  by: product.quantity,
                  where: { productId: product.productId }
               });
            });

            const {
               dataValues: { orderId }
            } = await db.order.create(
               {
                  totalCost,
                  customerId
               },
               {
                  transaction: t
               }
            );

            const productOrderList = products.map((product) => {
               return {
                  orderId,
                  productId: product.productId,
                  quantity: product.quantity
               };
            });

            await db.productOrder.bulkCreate(productOrderList, {
               transaction: t
            });

            await db.orderTracking.create(
               {
                  status: "pending",
                  orderId: orderId
               },
               {
                  transaction: t
               }
            );
         });
         res.status(201).json({ status: "success" });
      } catch (err) {
         console.error(err);
         res.status(500).json("something went wrong!");
      }
   }
});

module.exports = routes;
