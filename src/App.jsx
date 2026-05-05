// =======================================================
// FINAL APP.JSX (CLEAN + ORDERS FIXED)
// =======================================================

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

// MAIN PAGES
import Home from "./features/home.jsx/homePage";
import AuthPage from "./features/auth/authPage";
import ShopPage from "./features/shop/shop";
import ProductDetails from "./features/shop/productDetails";
import CartPage from "./features/cart/cartPage";
import OrderPage from "./features/orders/orderPage";

// OTHER PAGES
import AtelierPage from "./features/atelier/atelierPage";
import HeritagePage from "./features/heritage/heritagePage";
import SearchPage from "./features/search/searchPage";
import CarePage from "./features/care/carePage";

// ADMIN
import AdminProducts from "./features/shop/adminProducts";
import AdminDashboard from "./features/admin/adminDashboard";
import CategoryPage from "./features/category/categoryPage";

function App() {
  return (
    <BrowserRouter>

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN ================= */}
      <main className="min-h-screen">
        <Routes>

          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<CartPage />} />

          {/* ===== ORDER ROUTES (IMPORTANT) ===== */}
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/my-orders" element={<OrderPage />} />

          {/* ===== OTHER PAGES ===== */}
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/atelier" element={<AtelierPage />} />
          <Route path="/care" element={<CarePage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* ===== ADMIN ===== */}
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<OrderPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/category" element={<CategoryPage />} />

        </Routes>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;