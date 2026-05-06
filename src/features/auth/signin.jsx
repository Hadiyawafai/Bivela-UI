// ===============================
// SIGNIN PAGE (FINAL UPDATED)
// ROLE BASED LOGIN REDIRECT
// ===============================

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth/authService"

export default function SignIn({ setMode }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {
    const err = {};

    if (!form.usernameOrEmail.trim()) {
      err.usernameOrEmail =
        "Username or Email required";
    }

    if (!form.password.trim()) {
      err.password = "Password required";
    } else if (
      !strongPasswordRegex.test(form.password)
    ) {
      err.password =
        "Password must include upper, lower & number";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  // ===============================
  // LOGIN
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        usernameOrEmail:
          form.usernameOrEmail.trim(),
        password: form.password,
      };

      const res = await loginUser(payload);

      console.log("LOGIN SUCCESS:", res);

      // ===============================
      // SAVE TOKEN
      // ===============================
      if (res?.token) {
        localStorage.setItem(
          "token",
          res.token
        );
      }

      // ===============================
      // SAVE USER
      // ===============================
      if (res?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );
      }

      const roles =
        res?.user?.roles || [];

      console.log("Login successful");

      // ===============================
      // ROLE BASED REDIRECT
      // ===============================
      if (
        roles.includes("ROLE_ADMIN")
      ) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      alert(
        err?.response?.data
          ?.message ||
          err?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* HEADER */}
      <p
        className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-3"
        style={{
          fontFamily:
            "Cardo, serif",
        }}
      >
        Private Access
      </p>

      <h1
        className="text-4xl md:text-5xl text-[#1C2120]"
        style={{
          fontFamily:
            "TanAngleton, serif",
        }}
      >
        Sign In
      </h1>

      <p
        className="mt-4 text-sm text-[#1C2120]/65"
        style={{
          fontFamily:
            "Cardo, serif",
        }}
      >
        Enter your credentials to continue
        your Bivela journey.
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 mt-8"
      >
        {/* USERNAME */}
        <div>
          <label className="block text-sm mb-1 text-[#1C2120]">
            Username or Email
          </label>

          <input
            type="text"
            placeholder="username or email"
            value={
              form.usernameOrEmail
            }
            onChange={(e) =>
              setForm({
                ...form,
                usernameOrEmail:
                  e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-md outline-none focus:border-black"
          />

          {errors.usernameOrEmail && (
            <p className="text-xs text-red-500 mt-1">
              {
                errors.usernameOrEmail
              }
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm mb-1 text-[#1C2120]">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="********"
              value={
                form.password
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-md pr-10 outline-none focus:border-black"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff
                  size={18}
                />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1C2120] text-white py-3 tracking-widest hover:bg-black transition disabled:opacity-60"
          style={{
            fontFamily:
              "Cardo, serif",
          }}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      {/* LINKS */}
      <div className="text-center mt-6 text-sm space-y-2 text-[#1C2120]">
        <button
          onClick={() =>
            setMode("signup")
          }
          className="underline"
        >
          Create account
        </button>

        <button
          onClick={() =>
            setMode("forgot")
          }
          className="underline block mx-auto text-[#1C2120]"
        >
          Forgotten your password?
        </button>
      </div>
    </div>
  );
}