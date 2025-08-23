import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Globe } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Email daxil edin ");
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
        setStatus("Uğurlu giriş "); 
        navigate("../");
      } else {
        setStatus("Email tapılmadı ");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server xətası ");
    }
  };

  return (
    <div>
      <div className="h-[70px] w-full flex justify-between items-center container">
        <div className="">
          <Link to="../">
            <img src="/teslalogo.svg" alt="Tesla" className="w-40 h-40" />
          </Link>
        </div>
        <div className=" flex items-center gap-1 text-sm text-gray-600">
          <Globe className="w-5 h-5" />
        </div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
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

            {status && <p className="mt-3 text-red-600">{status}</p>}

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
          <span className="hover:underline cursor-pointer">
            Privacy & Legal
          </span>
          <span className="hover:underline cursor-pointer">Contact</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
