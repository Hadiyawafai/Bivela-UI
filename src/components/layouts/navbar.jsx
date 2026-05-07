// =======================================================
// ✅ FINAL NAVBAR WITH WISHLIST HEART
// =======================================================

import React, { useEffect, useState, useRef } from "react";
import {
  ShoppingBag,
  Menu,
  User,
  Search,
  X,
  LogOut,
  Heart, // ✅ ADDED
} from "lucide-react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [userOpen, setUserOpen] =
    useState(false);

  const userRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();

  const isAuthPage =
    location.pathname === "/auth";

  // ===============================
  // LOGIN DATA
  // ===============================

  const token =
    localStorage.getItem("token");

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const roles =
    storedUser?.roles || [];

  const username =
    storedUser?.username || "Guest";

  const isLoggedIn = !!token;

  // ✅ FIXED ADMIN CHECK
  const isAdmin = roles.some(
    (role) =>
      role === "ROLE_ADMIN" ||
      role?.name === "ROLE_ADMIN"
  );

  // ===============================
  // OUTSIDE CLICK CLOSE
  // ===============================

  useEffect(() => {
    const handleClickOutside = (
      e
    ) => {
      if (
        userRef.current &&
        !userRef.current.contains(
          e.target
        )
      ) {
        setUserOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // ===============================
  // SCROLL EFFECT
  // ===============================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 15
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "userId"
    );

    window.location.href = "/";
  };

  // ===============================
  // ROLE NAVIGATION
  // ===============================

  const goToDashboard = () => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile");
    }

    setUserOpen(false);
  };

  // ===============================
  // STYLE
  // ===============================

  const darkMode =
    scrolled ||
    isAuthPage ||
    menuOpen;

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

  const navLinkClass = ({
    isActive,
  }) =>
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

  // ======================================================
  // UI
  // ======================================================

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* MOBILE */}
          <div className="lg:hidden w-1/3">
            <button
              onClick={() =>
                setMenuOpen(true)
              }
            >
              <Menu
                className={`w-5 h-5 ${textClass}`}
              />
            </button>
          </div>

          {/* LEFT */}
          <div className="hidden lg:flex w-1/3 items-center gap-7">

            <NavLink
              to="/shop"
              className={navLinkClass}
              style={navTextStyle}
            >
              Shop
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

          {/* LOGO */}
          <div className="lg:w-1/3 w-full flex justify-center">

            <div className="flex flex-col items-center leading-none">

              <div className="relative inline-block">

                <NavLink to="/">
                  <span
                    className={`${textClass}`}
                    style={{
                      fontFamily:
                        "TanAngleton, serif",
                      fontSize: "42px",
                      letterSpacing:
                        "-0.06em",
                    }}
                  >
                    BIVELA
                  </span>
                </NavLink>

                <span
                  className={`absolute -top-1 right-0 translate-x-[140%] text-[6px] border rounded-full w-[16px] h-[16px] flex items-center justify-center ${textClass} ${tmBorder}`}
                >
                  TM
                </span>

              </div>

              <span
                className={`mt-1 ${textClass}`}
                style={{
                  fontFamily:
                    "Cardo, serif",
                  letterSpacing:
                    "0.40em",
                  fontSize: "10px",
                }}
              >
                WEAR ART
              </span>

            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex w-1/3 justify-end items-center gap-6">

            {/* SEARCH */}
            <NavLink to="/search">
              <Search
                className={`w-5 h-5 ${textClass}`}
              />
            </NavLink>

            {/* CARE */}
            <NavLink
              to="/care"
              className={navLinkClass}
              style={navTextStyle}
            >
              Care
            </NavLink>

            {/* ✅ WISHLIST */}
            <NavLink
              to="/wishlist"
              className="relative"
            >
              <Heart
                className={`w-5 h-5 ${textClass} hover:text-red-500 transition`}
              />
            </NavLink>

            {/* CART */}
            <NavLink to="/cart">
              <ShoppingBag
                className={`w-5 h-5 ${textClass}`}
              />
            </NavLink>

            {/* LOGIN */}
            {!isLoggedIn && (
              <NavLink to="/auth">
                <User
                  className={`w-5 h-5 ${textClass}`}
                />
              </NavLink>
            )}

            {/* USER */}
            {isLoggedIn && (
              <div
                className="relative"
                ref={userRef}
              >

                <button
                  onClick={() =>
                    setUserOpen(
                      !userOpen
                    )
                  }
                >
                  <User
                    className={`w-5 h-5 ${textClass}`}
                  />
                </button>

                {userOpen && (
                  <div className="absolute right-0 mt-5 w-64 bg-[#F2F0EF] border border-black/10 shadow-2xl rounded-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="px-5 py-4 border-b border-black/10">

                      <p className="text-sm font-semibold text-[#1C2120]">
                        {username}
                      </p>

                      <p className="text-[11px] text-black/50 uppercase tracking-widest mt-1">
                        {isAdmin
                          ? "Admin"
                          : "Customer"}
                      </p>

                    </div>

                    {/* BODY */}
                    <div className="flex flex-col">

                      <button
                        onClick={
                          goToDashboard
                        }
                        className="px-5 py-3 text-sm text-left hover:bg-black hover:text-[#F2F0EF] transition"
                      >
                        {isAdmin
                          ? "Go to Dashboard"
                          : "My Profile"}
                      </button>

                      <button
                        onClick={
                          handleLogout
                        }
                        className="px-5 py-3 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                      >
                        <LogOut
                          size={14}
                        />
                        Logout
                      </button>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE RIGHT */}
          <div className="lg:hidden w-1/3"></div>

        </div>

        <div
          className={`border-b ${borderClass}`}
        ></div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-[#1C2120] z-[60] transition-all duration-500 ${
          menuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >

        <div className="px-6 py-6 flex justify-between items-center border-b border-white/10">

          <h2
            className="text-[#F2F0EF] text-3xl"
            style={{
              fontFamily:
                "TanAngleton, serif",
            }}
          >
            BIVELA
          </h2>

          <button
            onClick={() =>
              setMenuOpen(false)
            }
          >
            <X className="text-[#F2F0EF] w-6 h-6" />
          </button>

        </div>

        <div className="px-6 py-8 flex flex-col">

          <NavLink
            to="/"
            className={mobileLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={mobileLinkClass}
          >
            Shop
          </NavLink>

          {/* ✅ MOBILE WISHLIST */}
          <NavLink
            to="/wishlist"
            className={mobileLinkClass}
          >
            Wishlist
          </NavLink>

          <NavLink
            to="/cart"
            className={mobileLinkClass}
          >
            Cart
          </NavLink>

          {isLoggedIn && (
            <button
              onClick={
                handleLogout
              }
              className={
                mobileLinkClass
              }
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </>
  );
};

export default Navbar;