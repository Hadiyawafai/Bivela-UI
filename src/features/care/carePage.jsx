import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  Phone,
  MapPin,
  LocateFixed,
} from "lucide-react";

import { bookService } from "../care/careService";


const CarePage = () => {
  // ======================================================
  // SERVICES
  // ======================================================

  const services = [
    {
      title: "Luxury Cleaning",
      desc: "Gentle restoration of softness, texture and brilliance using artisan-approved care methods.",
      icon: <Sparkles size={22} />,
    },
    {
      title: "Heritage Restoration",
      desc: "Repair delicate threads, revive embroidery and preserve treasured heirloom craftsmanship.",
      icon: <ShieldCheck size={22} />,
    },
    {
      title: "Private Pickup",
      desc: "Arrange a premium pickup with flexible scheduling and concierge convenience.",
      icon: <CalendarDays size={22} />,
    },
  ];

  // ======================================================
  // FORM STATE
  // ======================================================

  const [serviceType, setServiceType] =
    useState("Luxury Cleaning");

  const [scheduledDate, setScheduledDate] =
    useState("");

  const [address, setAddress] = useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  // ✅ GEOLOCATION
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ======================================================
  // 📍 GET CURRENT LOCATION
  // ======================================================

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        setLocationLoading(false);

        alert("📍 Location detected successfully");
      },
      (error) => {
        console.log(error);

        setLocationLoading(false);

        alert("Unable to fetch location");
      }
    );
  };

  // ======================================================
  // 🚀 BOOK SERVICE
  // ======================================================

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ FIXED USER FETCH
      const storedUser =
        JSON.parse(localStorage.getItem("user"));

      const userId =
        storedUser?.id ||
        localStorage.getItem("userId");

      // ✅ LOGIN CHECK
      if (!token) {
        alert("Please login first");
        return;
      }

      // ✅ USER CHECK
      if (!userId) {
        console.log("USER DATA:", storedUser);

        alert(
          "User not found. Please login again."
        );

        return;
      }

      // ✅ VALIDATION
      if (
        !scheduledDate ||
        !address ||
        !phoneNumber
      ) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      // ✅ PAYLOAD
      const payload = {
        userId: Number(userId),
        serviceType,
        scheduledDate,
        address,
        phoneNumber,
        latitude: Number(latitude) || 0,
        longitude: Number(longitude) || 0,
      };

      console.log("BOOKING PAYLOAD:", payload);

      // ✅ API CALL
      await bookService(payload);

      alert(
        "✨ Premium care service booked successfully!"
      );

      // ✅ RESET
      setScheduledDate("");
      setAddress("");
      setPhoneNumber("");
      setLatitude("");
      setLongitude("");

    } catch (error) {
      console.log("BOOKING ERROR:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120] pt-32">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Care & Maintenance
        </p>

        <h1
          className="text-5xl md:text-7xl leading-tight"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Preserve
          <br />
          Your Legacy Piece
        </h1>

        <p
          className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Every Bivela shawl deserves timeless care.
          Our premium maintenance service restores
          softness, embroidery and heirloom elegance.
        </p>
      </section>

    

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">

          {services.map((item, index) => (
            <div
              key={index}
              className="border border-black/10 p-8 bg-white hover:bg-[#1C2120] hover:text-[#F2F0EF] transition duration-500 shadow-sm"
            >
              <div className="mb-6">
                {item.icon}
              </div>

              <h3
                className="text-3xl mb-4"
                style={{
                  fontFamily: "TanAngleton, serif",
                }}
              >
                {item.title}
              </h3>

              <p
                className="leading-8 text-sm opacity-80"
                style={{ fontFamily: "Cardo, serif" }}
              >
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* BOOKING */}
      <section className="border-t border-black/10 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-24">

          <div className="text-center mb-14">
            <p
              className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Concierge Booking
            </p>

            <h2
              className="text-4xl md:text-6xl leading-tight mb-8"
              style={{
                fontFamily: "TanAngleton, serif",
              }}
            >
              Arrange Premium
              <br />
              Pickup Service
            </h2>
          </div>

          {/* FORM */}
          <div className="space-y-8">

            {/* SERVICE TYPE */}
            <div>
              <label className="block mb-3 text-sm uppercase tracking-widest">
                Service Type
              </label>

              <select
                value={serviceType}
                onChange={(e) =>
                  setServiceType(e.target.value)
                }
                className="w-full border border-black/10 p-4 bg-[#F8F6F4] outline-none focus:border-black transition"
              >
                <option>Luxury Cleaning</option>
                <option>Heritage Restoration</option>
                <option>Private Pickup</option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <label className="block mb-3 text-sm uppercase tracking-widest">
                Preferred Date
              </label>

              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) =>
                  setScheduledDate(e.target.value)
                }
                className="w-full border border-black/10 p-4 bg-[#F8F6F4] outline-none focus:border-black transition"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm uppercase tracking-widest">
                  Pickup Address
                </label>

                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="text-xs flex items-center gap-2 border border-black/10 px-4 py-2 hover:bg-black hover:text-white transition"
                >
                  <LocateFixed size={14} />

                  {locationLoading
                    ? "Detecting..."
                    : "Use Current Location"}
                </button>
              </div>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-4 text-black/40"
                />

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Enter pickup address manually or use current location"
                  className="w-full border border-black/10 p-4 pl-12 bg-[#F8F6F4] outline-none min-h-[120px] focus:border-black transition"
                />
              </div>
            </div>

            {/* LOCATION PREVIEW */}
            {(latitude || longitude) && (
              <div className="bg-[#F8F6F4] border border-black/10 p-5 rounded-sm">
                <p className="text-xs uppercase tracking-widest mb-3 text-black/60">
                  Detected Coordinates
                </p>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">
                      Latitude:
                    </span>{" "}
                    {latitude}
                  </div>

                  <div>
                    <span className="font-medium">
                      Longitude:
                    </span>{" "}
                    {longitude}
                  </div>
                </div>
              </div>
            )}

            {/* PHONE */}
            <div>
              <label className="block mb-3 text-sm uppercase tracking-widest">
                Contact Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-4 text-black/40"
                />

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                  placeholder="Enter phone number"
                  className="w-full border border-black/10 p-4 pl-12 bg-[#F8F6F4] outline-none focus:border-black transition"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full px-10 py-5 bg-[#1C2120] text-[#F2F0EF] text-xs uppercase tracking-[0.30em] hover:opacity-90 transition inline-flex items-center justify-center gap-3 disabled:opacity-50"
              style={{ fontFamily: "Cardo, serif" }}
            >
              {loading
                ? "Booking Service..."
                : "Book Premium Service"}

              <ArrowRight size={16} />
            </button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default CarePage;