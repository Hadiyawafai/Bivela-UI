// =======================================================
// ✅ FINAL APP.JSX (ADMIN FIXED + CLEAN)
// =======================================================

import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// =======================================================
// LAYOUT
// =======================================================

import Navbar from "./components/layouts/navbar";
import Footer from "./components/layouts/Footer";

// =======================================================
// MAIN PAGES
// =======================================================

import Home from "./features/home/homePage";

import AuthPage from "./features/auth/authPage";

import ShopPage from "./features/shop/shop";

import ProductDetails from "./features/shop/productDetails";

import CartPage from "./features/cart/cartPage";

import OrderPage from "./features/orders/orderPage";

import WishlistPage from "./features/shop/wishlistPage";

// =======================================================
// OTHER PAGES
// =======================================================

import AtelierPage from "./features/atelier/atelierPage";

import HeritagePage from "./features/heritage/heritagePage";

import SearchPage from "./features/search/searchPage";

import CarePage from "./features/care/carePage";

import CategoryPage from "./features/category/categoryPage";

// =======================================================
// ADMIN
// =======================================================

import AdminDashboard from "./features/admin/adminDashboard";

// =======================================================
// APP
// =======================================================

function App() {
  return (
    <BrowserRouter>

      {/* ======================================================= */}
      {/* NAVBAR */}
      {/* ======================================================= */}

      <Navbar />

      {/* ======================================================= */}
      {/* MAIN */}
      {/* ======================================================= */}

      <main className="min-h-screen">

        <Routes>

          {/* ======================================================= */}
          {/* PUBLIC ROUTES */}
          {/* ======================================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/auth"
            element={<AuthPage />}
          />

          <Route
            path="/shop"
            element={<ShopPage />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/orders"
            element={<OrderPage />}
          />

          <Route
            path="/wishlist"
            element={<WishlistPage />}
          />

          {/* ======================================================= */}
          {/* OTHER PAGES */}
          {/* ======================================================= */}

          <Route
            path="/heritage"
            element={<HeritagePage />}
          />

          <Route
            path="/atelier"
            element={<AtelierPage />}
          />

          <Route
            path="/care"
            element={<CarePage />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />

          <Route
            path="/admin/category"
            element={<CategoryPage />}
          />

         
          {/* ADMIN ROUTES */}
         

          <Route
            path="/admin/*"
            element={<AdminDashboard />}
          />

        </Routes>

      </main>

     

      <Footer />

    </BrowserRouter>
  );
}

export default App;