const express = require("express");
const routes = express.Router();
routes.use(express.json());
const db = require("../models");
const { Op } = require("sequelize");

routes.get("/getAll", (req, res) => {
   db.product
      .findAll({
         where: {
            inStock: {
               [Op.gt]: 2
            }
         }
      })
      .then((products) => res.send(products));
});

routes.post("/insertBulk", async (req, res) => {
   if (req && req.body) {
      db.product.bulkCreate(req.body).then((createdProducts) => {
         res.status(201).json(createdProducts);
      });
   }
});

routes.put("/edit", async (req, res) => {
   if (req && req.body) {
      const { productId, ...rest } = req.body;
      db.product
         .update(rest, {
            where: {
               productId: req.body.productId
            }
         })
         .then((updated) => {
            res.status(200).json(updated);
         });
   }
});

// routes.put("/updateProductCount", async (req, res) => {
//    if (req && req.body) {
//       try {
//          const result = await db.sequelize.transaction(async (t) => {
//             req.body.forEach((product) => {
//                db.product.decrement("inStock", {
//                   by: product.quantity,
//                   where: { productId: product.productId }
//                });
//             });
//             return { status: "success" };
//          });
//          res.status(200).json(result);
//       } catch (err) {
//          console.error(error);
//          res.status(500).json("something went wrong!");
//       }
//    }
// });

//TODO  add routes for edit and delete for ratings
routes.post("/addRating", async (req, res) => {
   if (req && req.body) {
      db.productFeedback.create(req.body).then((createdProducts) => {
         res.status(201).json(createdProducts);
      });
   }
});

module.exports = routes;
