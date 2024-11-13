// AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/AdminLayout"; // Import AdminLayout to wrap all admin routes
import { DashBoardViewPage } from "./DashBoardPages/DashBoardViewPage";
import { UserManagementPage } from "./UsersPages/UserManagementPage";
import { ProductManagementPage } from "./ProductPages/ProductManagementPage";
import OrderManagementPanell from "./OrdersPages/OrderManagementPanell";
 
import UserModerator  from "../components/UserComponents/UserModerator";
import UserSellers from "../components/UserComponents/UserSellers";
import  UserProfileView from "../components/UserComponents/UserProfileView";
import { DetailedProductView } from "../components/ProductComponents/ProductComponents";
import NotFound from "../components/NotFound";
import UserBuyer from "../components/UserComponents/UserBuyer";

export const AdminRoutes = () => {
  return (
    <Routes>
      {/* The "/admin" route will render the AdminLayout */}
      <Route path="/" element={<AdminLayout />}>
        {/* Nested routes under AdminLayout */}
        <Route path="admin" element={<DashBoardViewPage />} exact />

        <Route path="dashbord" element={<DashBoardViewPage />} />
        <Route path="orders" element={<OrderManagementPanell />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="/users/mod" element={<UserModerator />} />
        <Route path="/users/seller" element={<UserSellers />} />
        <Route path="/users/buyer" element={<UserBuyer />} />
        <Route path="/users/user/:id" element={<UserProfileView />} />

        <Route path="products" element={<ProductManagementPage />} />
        <Route
          path="products/detailedProduct"
          element={<DetailedProductView />}
        />
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
