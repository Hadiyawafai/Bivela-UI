import React, { useState } from "react";

export default function SignIn({ setMode }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    const validate = () => {
        const err = {};

        if (!emailRegex.test(form.email)) {
            err.email = "Enter valid email";
        }

        if (!strongPasswordRegex.test(form.password)) {
            err.password =
                "Password must include upper, lower & number (6+ chars)";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("SIGN IN:", form);
    };

    return (
        <div className="w-full max-w-md">
 <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-3"
 style={{ fontFamily: "Cardo, serif" }}>
    Private Access
  </p>

  <h1
    className="text-4xl md:text-5xl text-[#1C2120] leading-tight"
    style={{ fontFamily: "TanAngleton, serif" }}
  >
    Sign In
  </h1>

  <p className="mt-4 text-sm text-[#1C2120]/65 tracking-wide"
  style={{ fontFamily: "Cardo, serif" }}>
    Enter your credentials to continue your Bivela journey.
  </p>

            <form onSubmit={handleSubmit} className="space-y-5 mt-8">

                {/* EMAIL */}
                <div>
                    <label className="block text-sm text-[#1C2120] mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-black"
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

                <button className="w-full bg-[#1C2120] font-serif text-white py-2 text-sm tracking-widest hover:bg-gray-800 transition"
                style={{ fontFamily: "Cardo, serif" }}>
                    Sign In
                </button>

            </form>

            <div className="text-center mt-6 text-sm space-y-2">
                <p>

                    <button onClick={() => setMode("signup")} className="underline font-serif text-[#1C2120] hover:text-gray-600"
                        style={{ fontFamily: "Cardo, serif" }}>
                        Create account
                    </button>
                </p>

                <p>
                    <button onClick={() => setMode("forgot")} className="underline font-serif text-[#1C2120] hover:text-gray-600"
                        style={{ fontFamily: "Cardo, serif" }}>
                        Forgotten your password?
                    </button>
                </p>
            </div>

        </div>
    );
}