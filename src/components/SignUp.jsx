import axios from "axios";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom"; // 🔹 Sign in səhifəsinə yönləndirmək üçün
import { Globe, Link } from "lucide-react";

const SignUp = () => {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    region: "",
    password: "",
    confirmPass: "",
    email: "",
  });
  const [status, setStatus] = useState(null);
  const [otpCode, setOtpCode] = useState(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");

  const navigate = useNavigate();

  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_PUBLIC_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const generateOtp = () => {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  };

  const sendOtpEmail = async (otp) => {
    const templateParams = { to_email: value.email, passcode: otp };
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      setStatus("OTP email göndərildi ");
    } catch (error) {
      console.error("Email göndərmə xətası:", error);
      setStatus("Email göndərilmədi ");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifrələrin uyğunluğu
    if (value.password !== value.confirmPass) {
      setStatus("Şifrələr uyğun deyil ");
      return;
    }

    // Şifrə tələbləri
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value.password)) {
      setStatus(
        "Şifrə ən azı 8 simvol, 1 hərf və 1 rəqəmdən ibarət olmalıdır!"
      );
      return;
    }

    // OTP göndərilir
    const otp = generateOtp();
    setOtpCode(otp);
    await sendOtpEmail(otp);

    setOtpModalOpen(true);
  };

  const verifyOtp = async () => {
    if (enteredOtp === otpCode) {
      try {
        await axios.post(
          "https://67ee3f81c11d5ff4bf78e1b1.mockapi.io/signUp",
          value
        );
        setStatus("Register olundu ");
        setOtpModalOpen(false);
      } catch (error) {
        console.log(error);
        setStatus("Register xətası ");
      }
    } else {
      setStatus("Yanlış OTP ");
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
          <h1 className="text-2xl font-semibold mb-6">Create Account</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Region */}
            <div className="text-left">
              <label className="text-sm font-medium text-gray-700">
                Region
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:border-black"
                name="region"
                onChange={handleChange}
                value={value.region}
              >
                <option value="">Select Region</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="United States">United States</option>
                <option value="Germany">Germany</option>
              </select>
            </div>

            {/* First Name */}
            <div className="text-left">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
                name="firstName"
                onChange={handleChange}
                value={value.firstName}
              />
            </div>

            {/* Last Name */}
            <div className="text-left">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
                name="lastName"
                onChange={handleChange}
                value={value.lastName}
              />
            </div>

            {/* Email */}
            <div className="text-left">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
                name="email"
                onChange={handleChange}
                value={value.email}
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
                name="password"
                onChange={handleChange}
                value={value.password}
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 simvol, ən az 1 hərf və 1 rəqəm olmalıdır.
              </p>
            </div>
            {/* Confirm Password */}
            <div className="text-left">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
                name="confirmPass"
                onChange={handleChange}
                value={value.confirmPass}
              />
            </div>

            {/* Agreement */}
            <p className="text-xs text-gray-500 text-left mt-2">
              By clicking 'Next', I understand and agree to Tesla’s{" "}
              <span className="text-gray-700 underline cursor-pointer">
                Privacy Notice
              </span>{" "}
              and{" "}
              <span className="text-gray-700 underline cursor-pointer">
                Terms of Use
              </span>
              .
            </p>

            {/* 🔹 Düymə dəyişir */}
            {status === "Register olundu " ? (
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white rounded-md py-2 font-medium"
              >
                Sign In
              </button>
            ) : (
              <button
                type="submit"
                className="w-full mt-4 bg-[#c2cdfc] hover:bg-[#a4b3f8] text-white rounded-md py-2 font-medium"
              >
                Sign Up
              </button>
            )}
          </form>

          {status && <p className="mt-3 text-red-600">{status}</p>}
        </div>

        {/* OTP Modal */}
        {otpModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-black"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-[#c2cdfc] hover:bg-[#a4b3f8] text-white rounded-md py-2 font-medium"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
