import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

import Home from "./features/home.jsx/homePage";
import AuthPage from "./features/auth/authPage";
import ShopPage from "./features/shop/shop";
import AtelierPage from "./features/atelier/atelierPage";
import HeritagePage from "./features/heritage/heritagePage";
import SearchPage from "./features/search/searchPage";
import CarePage from "./features/care/carePage";
import CartPage from "./features/cart/cartPage";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="min-h-screen">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* IMPORTANT FIX */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Other Pages */}
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/atelier" element={<AtelierPage />} />
          <Route path="/care" element={<CarePage />} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;