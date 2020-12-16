const express = require("express");
const bcrypt = require("bcrypt");
const routes = express.Router();
routes.use(express.json());
const db = require("../models");
const jwt = require("jsonwebtoken");

routes.post("/login", async (req, res) => {
   if (req && req.body) {
      const { email, password } = req.body;
      let user = await db.login.findOne({
         where: {
            email
         }
      });
      if (user) {
         const checkPass = await bcrypt.compare(password, user.password);
         if (checkPass) {
            const {
               dataValues: {
                  loginId,
                  email,
                  firstName,
                  lastName,
                  role,
                  customerId,
                  warehouseId,
                  vendorId
               }
            } = user;
            const userInfo = {
               loginId,
               email,
               firstName,
               lastName,
               role,
               customerId,
               warehouseId,
               vendorId
            };
            const accessToken = jwt.sign(userInfo, "mysecretToken", {
               expiresIn: "90m"
            });
            res.status(200).json({
               userInfo,
               accessToken
            });
         } else {
            res.status(401).json("Incorrect Password! Please try again.");
         }
      } else {
         res.status(404).json("Email not found!");
      }
   }
});

routes.post("/registerCustomer", async (req, res) => {
   if (req && req.body) {
      const { email, firstName, lastName, password, phone } = req.body;
      let exisitingUser = await db.login.findOne({
         where: {
            email
         }
      });
      if (exisitingUser) {
         return res.status(401).json("Email is already registered.");
      }
      try {
         const result = await db.sequelize.transaction(async (t) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const {
               dataValues: { customerId }
            } = await db.customer.create(
               {
                  phone: phone
               },
               {
                  transaction: t
               }
            );

            const loginDetails = await db.login.create(
               {
                  role: "customer",
                  email,
                  password: hashedPassword,
                  customerId,
                  firstName,
                  lastName
               },
               {
                  transaction: t
               }
            );
            return loginDetails;
         });
         res.status(201).json({
            status: "success"
         });
      } catch (error) {
         console.error(error);
         res.status(500).json("something went wrong!");
      }
   }
});

routes.post("/registerVendor", async (req, res) => {
   if (req && req.body) {
      const {
         companyName,
         warehouseId,
         fullfilmentRate,
         firstName,
         lastName,
         role,
         email,
         password,
         phone,
         addressType,
         addressLine1,
         city,
         state,
         zipcode
      } = req.body;
      let exisitingVendorAccount = await db.login.findOne({
         where: {
            email
         }
      });
      if (exisitingVendorAccount) {
         return res.status(200).json({
            status: "failure",
            message: "Exisiting vendor account is already registered using same email address."
         });
      }
      try {
         const result = await db.sequelize.transaction(async (t) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const {
               dataValues: { vendorId }
            } = await db.vendor.create(
               {
                  phone,
                  companyName,
                  warehouseId,
                  fullfilmentRate,
                  firstName,
                  lastName
               },
               {
                  transaction: t
               }
            );

            await db.login.create(
               {
                  role,
                  email,
                  password: hashedPassword,
                  vendorId
               },
               {
                  transaction: t
               }
            );

            await db.address.create(
               {
                  addressType,
                  addressLine1,
                  city,
                  state,
                  zipcode,
                  vendorId
               },
               {
                  transaction: t
               }
            );

            return "success";
         });
         res.status(201).json({
            status: "success",
            message: "Successfully registered!"
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({
            status: "failure",
            message: "something went wrong!"
         });
      }
   }
});

routes.post("/registerWarehouse", async (req, res) => {
   if (req && req.body) {
      const {
         role,
         email,
         password,
         phone,
         remainingStorage,
         totalStorage,
         totalShelves,
         slug,
         addressType,
         addressLine1,
         city,
         state,
         zipcode
      } = req.body;
      let exisitingWarehouseAccount = await db.login.findOne({
         where: {
            email
         }
      });
      if (exisitingWarehouseAccount) {
         return res.status(200).json({
            status: "failure",
            message: "Exisiting warehouse account is already registered using same email address."
         });
      }
      try {
         const result = await db.sequelize.transaction(async (t) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const {
               dataValues: { warehouseId }
            } = await db.warehouse.create(
               {
                  phone,
                  remainingStorage,
                  totalStorage,
                  totalShelves,
                  slug
               },
               {
                  transaction: t
               }
            );

            await db.login.create(
               {
                  role,
                  email,
                  password: hashedPassword,
                  warehouseId
               },
               {
                  transaction: t
               }
            );

            await db.address.create(
               {
                  addressType,
                  addressLine1,
                  city,
                  state,
                  zipcode,
                  warehouseId
               },
               {
                  transaction: t
               }
            );

            return "success";
         });
         res.status(201).json({
            status: "success",
            message: "Successfully registered!"
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({
            status: "failure",
            message: "something went wrong!"
         });
      }
   }
});

module.exports = routes;
