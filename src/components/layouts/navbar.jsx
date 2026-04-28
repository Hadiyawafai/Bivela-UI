import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Menu,
  User,
  Search,
  ChevronDown,
  X,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const darkMode = scrolled || isAuthPage || menuOpen;

  const bgClass = darkMode
    ? "bg-[#1C2120]/95 backdrop-blur-md shadow-sm"
    : "bg-[#F2F0EF]/90 backdrop-blur-xl";

  const textClass = darkMode
    ? "text-[#F2F0EF]"
    : "text-[#1C2120]";

  const borderClass = darkMode
    ? "border-white/10"
    : "border-black/10";

  const tmBorder = darkMode
    ? "border-[#F2F0EF]"
    : "border-[#1C2120]";

  const navTextStyle = {
    fontFamily: "Cardo, serif",
    letterSpacing: "0.28em",
  };

  const navLinkClass = ({ isActive }) =>
    `
    ${textClass}
    text-[12px]
    uppercase
    transition
    hover:opacity-80
    pb-1
    border-b
    ${
      isActive
        ? darkMode
          ? "border-[#F2F0EF]"
          : "border-[#1C2120]"
        : "border-transparent"
    }
  `;

  const mobileLinkClass = `
    text-[#F2F0EF]
    text-sm
    uppercase
    tracking-[0.28em]
    py-4
    border-b
    border-white/10
  `;

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* MOBILE HAMBURGER */}
          <div className="lg:hidden w-1/3">
            <button onClick={() => setMenuOpen(true)}>
              <Menu
                className={`w-5 h-5 transition-all duration-300 ${textClass}`}
              />
            </button>
          </div>

          {/* DESKTOP LEFT */}
          <div className="hidden lg:flex w-1/3 items-center gap-6">
            <div className="flex items-center gap-7">
              <NavLink
                to="/shop"
                className={navLinkClass}
                style={navTextStyle}
              >
                <span className="flex items-center gap-1">
                  Shop 
                </span>
              </NavLink>

              <NavLink
                to="/heritage"
                className={navLinkClass}
                style={navTextStyle}
              >
                Heritage
              </NavLink>

              <NavLink
                to="/atelier"
                className={navLinkClass}
                style={navTextStyle}
              >
                Atelier
              </NavLink>
            </div>
          </div>

          {/* CENTER LOGO */}
          <div className="lg:w-1/3 w-full flex justify-center">
            <div className="flex flex-col items-center leading-none">
              <div className="relative inline-block">
                <NavLink to="/">
                  <span
                    className={`font-semibold transition-all duration-300 ${textClass}`}
                    style={{
                      fontFamily: "TanAngleton, serif",
                      letterSpacing: "-0.06em",
                      fontSize: "42px",
                    }}
                  >
                    BIVELA
                  </span>
                </NavLink>

                {/* TM */}
                <span
                  className={`absolute -top-1 right-0 translate-x-[140%] text-[6px] leading-none border rounded-full w-[16px] h-[16px] flex items-center justify-center ${textClass} ${tmBorder}`}
                  style={navTextStyle}
                >
                  TM
                </span>
              </div>

              <span
                className={`mt-1 transition-all duration-300 ${textClass}`}
                style={{
                  fontFamily: "Cardo, serif",
                  letterSpacing: "0.40em",
                  fontSize: "10px",
                }}
              >
                WEAR ART
              </span>
            </div>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden lg:flex w-1/3 justify-end items-center gap-6">
            <NavLink to="/search">
              <Search
                className={`w-5 h-5 transition-all duration-300 ${textClass}`}
              />
            </NavLink>

            <NavLink
              to="/care"
              className={navLinkClass}
              style={navTextStyle}
            >
              Care
            </NavLink>

            <NavLink to="/cart">
              <ShoppingBag
                className={`w-5 h-5 transition-all duration-300 ${textClass}`}
              />
            </NavLink>

            <NavLink to="/auth">
              <User
                className={`w-5 h-5 transition-all duration-300 ${textClass}`}
              />
            </NavLink>
          </div>

          {/* MOBILE EMPTY SPACE */}
          <div className="lg:hidden w-1/3"></div>
        </div>

        <div className={`border-b ${borderClass}`}></div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-[#1C2120] z-[60] transition-all duration-500 ${
          menuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* TOP */}
        <div className="px-6 py-6 flex justify-between items-center border-b border-white/10">
          <h2
            className="text-[#F2F0EF] text-3xl"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            BIVELA
          </h2>

          <button onClick={() => setMenuOpen(false)}>
            <X className="text-[#F2F0EF] w-6 h-6" />
          </button>
        </div>

        {/* ALL ITEMS */}
        <div className="px-6 py-8 flex flex-col">
          <NavLink to="/" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/shop" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/heritage" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Heritage</NavLink>
          <NavLink to="/atelier" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Atelier</NavLink>
          <NavLink to="/search" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Search</NavLink>
          <NavLink to="/care" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Care</NavLink>
          <NavLink to="/cart" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Cart</NavLink>
          <NavLink to="/auth" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Account</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;