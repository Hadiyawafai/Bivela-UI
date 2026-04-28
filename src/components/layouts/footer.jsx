import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F2F0EF] text-[#1C2120] border-t border-black/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* BRAND */}
        <div className="flex flex-col items-center md:items-start">
          <h2
            className="text-3xl mb-4"
            style={{
              fontFamily: "TanAngleton, serif",
              letterSpacing: "-0.04em",
            }}
          >
            BIVELA
          </h2>

          <p
            className="text-[11px] uppercase tracking-[0.35em] mb-6"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Wear Art
          </p>

          <p className="text-sm leading-7 text-[#1C2120]/80 max-w-xs">
            Crafted through heritage, refined through elegance.
            Every Bivela piece carries the soul of timeless artistry.
          </p>
        </div>

        {/* DISCOVER */}
        <div className="flex flex-col items-center md:items-start">
          <h3
            className="text-sm uppercase tracking-[0.30em] mb-6"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Discover
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <NavLink to="/heritage" className="hover:opacity-60 transition">
                Heritage
              </NavLink>
            </li>

            <li>
              <NavLink to="/shop" className="hover:opacity-60 transition">
                Shop Collections
              </NavLink>
            </li>

            <li>
              <NavLink to="/atelier" className="hover:opacity-60 transition">
                Custom Atelier
              </NavLink>
            </li>

            <li>
              <NavLink to="/care" className="hover:opacity-60 transition">
                Care & Maintenance
              </NavLink>
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="flex flex-col items-center md:items-start">
          <h3
            className="text-sm uppercase tracking-[0.30em] mb-6"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Services
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="hover:opacity-60 transition cursor-pointer">
              Concierge Support
            </li>
            <li className="hover:opacity-60 transition cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:opacity-60 transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:opacity-60 transition cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col items-center md:items-start">
          <h3
            className="text-sm uppercase tracking-[0.30em] mb-6"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Concierge
          </h3>

          <div className="space-y-4 text-sm leading-7 text-[#1C2120]/80">
            <p>Srinagar, Kashmir</p>
            <p>Phone / WhatsApp: +91 99999 99999</p>
            <p>contact@bivela.com</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 border-t border-black/10"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        
        <p className="text-xs tracking-[0.25em] uppercase text-[#1C2120]/70">
          © {new Date().getFullYear()} Bivela
        </p>

        <p
          className="text-xs uppercase tracking-[0.30em] text-[#1C2120]/70"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Crafted In Legacy · Worn In Elegance
        </p>

        <NavLink
          to="https://daneenalmajaz.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs  tracking-[0.25em] text-[#1C2120]/70 hover:opacity-60 transition"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Developed By Daneenn Al Majaz IT Services
        </NavLink>

      </div>
    </footer>
  );
};

export default Footer;