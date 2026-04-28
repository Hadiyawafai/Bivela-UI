import React, { useState } from "react";

export default function ForgotPassword({ setMode }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Enter valid email");
      return;
    }

    setError("");
    console.log("RESET LINK SENT:", email);
  };

  return (
    <div className="w-full max-w-md">

        <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-3"
        style={{ fontFamily: "Cardo, serif" }}>
    Account Recovery
  </p>

  <h1
    className="text-4xl md:text-5xl text-[#1C2120] leading-tight"
    style={{ fontFamily: "TanAngleton, serif" }}
  >
    Forgot Password
  </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-md"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button className="w-full bg-[#1C2120] text-[#F2F0EF] py-2 text-xs tracking-widest">
          Send Reset Link
        </button>

      </form>

      <div className="text-center font-serif mt-6 text-sm text-[#1C2120] hover:text-gray-600">
        <button onClick={() => setMode("signin")} className="underline text-sm"
          style={{ fontFamily: "Cardo, serif" }}>
          Sign In
        </button>
      </div>

    </div>
  );
}