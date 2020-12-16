const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");
const jwt = require("express-jwt");

// db.sequelize.sync({ force: true }).then((req) => {
//   app.listen(PORT, () => {
//     console.log("port -->", PORT);
//   });
// });

db.sequelize.sync().then((req) => {
   app.listen(PORT, () => {
      console.log("port -->", PORT);
   });
});

// app.use(
//    jwt({ secret: "mysecretToken", algorithms: ["HS256"] }).unless({
//       path: [/\/api\/auth*/]
//    })
// );

app.use("/api/auth", require("./routes/authController"));
app.use("/api/product", require("./routes/productController"));
app.use("/api/order", require("./routes/orderController"));
app.use("/api/vendor", require("./routes/vendorController"));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/build")));

   app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "build", "index.html"));
   });
}
