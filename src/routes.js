import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AccountView from "./views/account/AccountView";
import DashboardView from "./views/reports/DashboardView";
import LoginView from "./views/auth/LoginView";
import ProductListView from "./views/product/ProductListView";
import RegisterView from "./views/auth/RegisterView";
import Cart from "./views/product/CartView";

const routes = (isAuthenticated, role) => [
   {
      path: "app",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
         { path: "account", element: <AccountView /> },
         { path: "dashboard", element: <DashboardView /> },
         { path: "products", element: <ProductListView /> },
         { path: "cart", element: <Cart /> }
      ]
   },
   {
      path: "/",
      element: !isAuthenticated ? (
         <MainLayout />
      ) : role === "customer" ? (
         <Navigate to="/app/products" />
      ) : (
         <Navigate to="/app/dashboard" />
      ),
      children: [
         { path: "login", element: <LoginView /> },
         { path: "register", element: <RegisterView /> },
         { path: "/", element: <Navigate to="/app/" /> }
      ]
   }
];

export default routes;
