import React, { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";
import ForgotPassword from "./forgotpassword";

export default function AuthPage() {
  const [mode, setMode] = useState("signin");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F0EF] px-4 pt-28 pb-24">

      {mode === "signin" && <SignIn setMode={setMode} />}
      {mode === "signup" && <SignUp setMode={setMode} />}
      {mode === "forgot" && <ForgotPassword setMode={setMode} />}

    </div>
  );
}