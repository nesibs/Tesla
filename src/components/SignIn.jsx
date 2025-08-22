import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Email daxil edin ❌");
      return;
    }

    try {
      // Mock API-dən istifadəçiləri çəkmək
      const response = await axios.get(
        "https://67ee3f81c11d5ff4bf78e1b1.mockapi.io/signUp"
      );
      const users = response.data;
      console.log(response);
      

      const user = users.find((u) => u.email === email);
      if (user) {
        // Email tapıldı → login uğurlu
        localStorage.setItem("user", JSON.stringify(user));
        setStatus("Uğurlu giriş ✅");
        // İstəsən yönləndir
        navigate(""); // ya da home page
      } else {
        setStatus("Email tapılmadı ❌");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server xətası ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="absolute top-6 left-8">
        <img src="/tesla-logo.svg" alt="Tesla" className="h-5" />
      </div>

      {/* Dil seçimi */}
      <div className="absolute top-6 right-8 flex items-center gap-1 text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 12c2.28 0 4.38.93 5.9 2.44A8.962 8.962 0 0021 12c0-4.97-4.03-9-9-9S3 7.03 3 12c0 2.02.67 3.88 1.79 5.36A8.978 8.978 0 0012 21c4.97 0 9-4.03 9-9 0-1.03-.18-2.03-.51-2.96A8.963 8.963 0 0012 3z"
          />
        </svg>
        <span>en-US</span>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-6">Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="text-left mb-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              Email
              <span className="text-gray-400 cursor-pointer">ⓘ</span>
            </label>
          </div>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-[#c2cdfc] hover:bg-[#a4b3f8] text-white rounded-md py-2 font-medium"
          >
            Next
          </button>

          {status && <p className="mt-3">{status}</p>}

          <p className="mt-4 text-sm text-gray-500 hover:underline cursor-pointer">
            Trouble Signing In?
          </p>

          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <Link to="/signUp">
            <button
              type="button"
              className="w-full bg-gray-100 hover:bg-gray-200 text-black rounded-md py-2 font-medium"
            >
              Create Account
            </button>
          </Link>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-500 flex gap-4">
        <span>Tesla © 2025</span>
        <span className="hover:underline cursor-pointer">Privacy & Legal</span>
        <span className="hover:underline cursor-pointer">Contact</span>
      </div>
    </div>
  );
};

export default SignIn;
