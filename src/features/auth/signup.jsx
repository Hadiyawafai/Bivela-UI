import React, { useState } from "react";
import { registerUser } from "../auth/authService";
import { assignRole } from "../role/roleService";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp({ setMode }) {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {
    const err = {};

    if (!form.username.trim()) {
      err.username = "Username required";
    }

    if (!form.firstName.trim()) {
      err.firstName = "First name required";
    }

    if (!form.lastName.trim()) {
      err.lastName = "Last name required";
    }

    if (!emailRegex.test(form.email)) {
      err.email = "Enter valid email";
    }

    if (!strongPasswordRegex.test(form.password)) {
      err.password =
        "Password must contain uppercase, lowercase & number";
    }

    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        username: form.username.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      // STEP 1 - REGISTER USER
      const res = await registerUser(payload);

      console.log("REGISTER SUCCESS:", res);

      // depending on axios response structure
      const createdUser = res?.data || res;

      // STEP 2 - AUTO ASSIGN ROLE_USER
      await assignRole({
        userId: createdUser.id,
        roleName: "ROLE_USER",
      });

      alert("Account created successfully");

      // GO TO SIGNIN
      setMode("signin");

    } catch (err) {
      console.error("FULL ERROR:", err);

      if (err.response) {
        alert(
          err.response.data?.message ||
            "Server error"
        );
      } else if (err.request) {
        alert(
          "No response from server. Check backend / CORS."
        );
      } else {
        alert(err.message || "Request failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* HEADER */}
      <div className="text-left mb-8">
        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-3"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Join The House
        </p>

        <h1
          className="text-4xl md:text-5xl text-[#1C2120]"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Create Account
        </h1>

        <p
          className="mt-4 text-sm text-[#1C2120]/65"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Create your private profile and begin your
          Bivela experience.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Username"
          value={form.username}
          placeholder="username"
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
          error={errors.username}
        />

        <Input
          label="First Name"
          value={form.firstName}
          placeholder="first name"
          onChange={(e) =>
            setForm({
              ...form,
              firstName: e.target.value,
            })
          }
          error={errors.firstName}
        />

        <Input
          label="Last Name"
          value={form.lastName}
          placeholder="last name"
          onChange={(e) =>
            setForm({
              ...form,
              lastName: e.target.value,
            })
          }
          error={errors.lastName}
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          placeholder="you@gmail.com"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          value={form.password}
          placeholder="********"
          show={showPassword}
          setShow={setShowPassword}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          error={errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          value={form.confirmPassword}
          placeholder="********"
          show={showConfirmPassword}
          setShow={setShowConfirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1C2120] text-white py-3 tracking-widest disabled:opacity-60"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {/* SWITCH */}
      <div className="text-center mt-6 text-sm">
        Already have account?{" "}
        <button
          onClick={() => setMode("signin")}
          className="underline"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

/* ===============================
   INPUT
================================= */
const Input = ({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
}) => (
  <div>
    <label className="block text-sm mb-1">
      {label}
    </label>

    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-2 rounded-md"
    />

    {error && (
      <p className="text-xs text-red-500 mt-1">
        {error}
      </p>
    )}
  </div>
);

/* ===============================
   PASSWORD INPUT
================================= */
const PasswordInput = ({
  label,
  value,
  onChange,
  error,
  show,
  setShow,
  placeholder = "",
}) => (
  <div>
    <label className="block text-sm mb-1">
      {label}
    </label>

    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-2 rounded-md pr-10"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {show ? (
          <Eye size={18} />
        ) : (
          <EyeOff size={18} />
        )}
      </button>
    </div>

    {error && (
      <p className="text-xs text-red-500 mt-1">
        {error}
      </p>
    )}
  </div>
);