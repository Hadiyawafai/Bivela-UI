import React, { useState } from "react";

export default function SignUp({ setMode }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name required";

    if (!emailRegex.test(form.email))
      err.email = "Enter valid email";

    if (!strongPasswordRegex.test(form.password))
      err.password =
        "Password must include upper, lower & number";

    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("SIGN UP:", form);
  };

  return (
    <div className="w-full max-w-md">

   <div className="text-left mb-8">
  <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-3"
  style={{ fontFamily: "Cardo, serif" }}>
    Join The House
  </p>

  <h1
     className="text-4xl md:text-5xl text-[#1C2120] leading-tight"
    style={{ fontFamily: "TanAngleton, serif" }}
  >
    Create Account
  </h1>

  <p className="mt-4 text-sm text-[#1C2120]/65 tracking-wide"
  style={{ fontFamily: "Cardo, serif" }}>
    Create your private profile and begin your Bivela experience.
  </p>
</div>
      <form onSubmit={handleSubmit} className="space-y-5 mt-8">

        {/* NAME */}
        <div>
          <label className="block text-sm text-[#1C2120] mb-1">
            Full Name
          </label>
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-black"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-[#1C2120] mb-1">
            Email
          </label>
          <input
            placeholder="you@gmail.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-[#1C2120]"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm text-[#1C2120] mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-black"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm text-[#1C2120] mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-black"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button className="w-full bg-[#1C2120] text-[#F2F0EF] py-2 text-sm font-serif tracking-widest hover:bg-gray-800 transition"
        style={{ fontFamily: "Cardo, serif" }}>
          Sign up
        </button>

      </form>

      {/* SWITCH */}
      <div className="text-center mt-6 text-sm">
        <p>
          Already have account?{" "}
          <button
            onClick={() => setMode("signin")}
            className="underline text-[#1C2120] hover:text-gray-600 font-serif"
          >
            Sign in
          </button>
        </p>
      </div>

    </div>
  );
}