import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import AdminProducts from "../shop/AdminProducts";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F2F0EF] pt-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[260px_1fr]">

        {/* Sidebar */}
        <aside className="border-r border-black/10 px-6 py-10">
          <h2
            className="text-4xl mb-10"
            style={{
              fontFamily: "TanAngleton, serif",
            }}
          >
            BIVELA
          </h2>

          <nav className="space-y-5 text-sm uppercase tracking-[0.25em]">

            <NavLink to="/admin">
              Dashboard
            </NavLink>

            <br />

            <NavLink to="/admin/products">
              Products
            </NavLink>

            <br />

            <NavLink to="/admin/orders">
              Orders
            </NavLink>

            <br />
            
            <NavLink to="/category">
              Category
            </NavLink>

            <br />


            <NavLink to="/admin/customers">
              Customers
            </NavLink>
          </nav>
        </aside>

        {/* Content */}
        <section className="p-8">

          <Routes>
            <Route index element={<DashboardHome />} />
            <Route
              path="products"
              element={<AdminProducts />}
            />

            <Route
              path="orders"
              element={<h1>Orders Coming Soon</h1>}
            />

            <Route
              path="customers"
              element={<h1>Customers Coming Soon</h1>}
            />

          </Routes>

        </section>
      </div>
    </div>
  );
}