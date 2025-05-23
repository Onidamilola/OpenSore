import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Product from "../pages/Product";
import Login from "../pages/Login";

const isAuthenticated = () => !!localStorage.getItem("user");

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }
    />
    <Route
      path="/category/:name"
      element={
        <PrivateRoute>
          <Category />
        </PrivateRoute>
      }
    />
    <Route
      path="/product/:id"
      element={
        <PrivateRoute>
          <Product />
        </PrivateRoute>
      }
    />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
