import React, { useEffect, useState } from "react";

import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BrushCleaning,
} from "lucide-react";

// =======================================================
// PAGES
// =======================================================

import DashboardHome from "../admin/pages/dashboardHome";

import AdminProducts from "../shop/adminProducts";

import OrdersPage from "../admin/pages/orderPage";

import UsersPage from "../admin/pages/usersPage";

import CustomRequestsPage from "../admin/pages/customRequestPage";

import ServiceBookingsPage from "../admin/pages/serviceBookingPage";

import CategoryPage from "../category/categoryPage";

// =======================================================
// ADMIN DASHBOARD
// =======================================================

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [adminName, setAdminName] =
    useState("Admin");

  // =======================================================
  // AUTH CHECK
  // =======================================================

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
    }

    const username =
      localStorage.getItem("username");

    if (username) {
      setAdminName(username);
    }
  }, [navigate]);

  // =======================================================
  // LOGOUT
  // =======================================================

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("username");

    navigate("/auth");
  };

  // =======================================================
  // NAV STYLE
  // =======================================================

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
    ${
      isActive
        ? "bg-black text-white"
        : "text-black/70 hover:bg-black/5"
    }`;

  // =======================================================
  // UI
  // =======================================================

  return (
    <div className="min-h-screen bg-[#F2F0EF] pt-24">

      <div className="max-w-7xl mx-auto grid md:grid-cols-[270px_1fr]">

        {/* ======================================================= */}
        {/* SIDEBAR */}
        {/* ======================================================= */}

        <aside className="border-r border-black/10 px-6 py-10 min-h-[85vh]">

          {/* LOGO */}
          <h2
            className="text-4xl mb-2"
            style={{
              fontFamily: "TanAngleton, serif",
            }}
          >
            BIVELA
          </h2>

          <p className="text-sm text-black/50 mb-10">
            Welcome, {adminName}
          </p>

          {/* ======================================================= */}
          {/* NAVIGATION */}
          {/* ======================================================= */}

          <nav className="space-y-3 text-sm uppercase tracking-[0.2em]">

            {/* DASHBOARD */}
            <NavLink
              to="/admin"
              end
              className={navStyle}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            {/* PRODUCTS */}
            <NavLink
              to="/admin/products"
              className={navStyle}
            >
              <Package size={18} />
              Products
            </NavLink>

            {/* ORDERS */}
            <NavLink
              to="/admin/orders"
              className={navStyle}
            >
              <ShoppingBag size={18} />
              Orders
            </NavLink>

            {/* CUSTOM REQUESTS */}
            <NavLink
              to="/admin/custom-requests"
              className={navStyle}
            >
              <BrushCleaning size={18} />
              Custom Requests
            </NavLink>

            {/* SERVICE BOOKINGS */}
            <NavLink
              to="/admin/service-bookings"
              className={navStyle}
            >
              <BrushCleaning size={18} />
              Service Bookings
            </NavLink>
 
           
            {/* USERS */}
            <NavLink
              to="/admin/category"
              className={navStyle}
            >
              <Users size={18} />
              Category
            </NavLink>
           

          </nav>

          {/* ======================================================= */}
          {/* LOGOUT */}
          {/* ======================================================= */}

          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
          >
            Logout
          </button>

        </aside>

        {/* ======================================================= */}
        {/* CONTENT */}
        {/* ======================================================= */}

        <section className="p-8 w-full">

          <Routes>

            {/* DASHBOARD */}
            <Route
              index
              element={<DashboardHome />}
            />

            {/* PRODUCTS */}
            <Route
              path="products"
              element={<AdminProducts />}
            />

            {/* ORDERS */}
            <Route
              path="orders"
              element={<OrdersPage />}
            />

            {/* CUSTOM REQUESTS */}
            <Route
              path="custom-requests"
              element={<CustomRequestsPage />}
            />

            {/* SERVICE BOOKINGS */}
            <Route
              path="service-bookings"
              element={<ServiceBookingsPage />}
            />

            {/* USERS */}
            <Route
              path="users"
              element={<UsersPage />}
            />
 <Route
              path="category"
              element={<CategoryPage />}
            />
          </Routes>

        </section>

      </div>

    </div>
  );
}