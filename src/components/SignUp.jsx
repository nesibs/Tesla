import axios from "axios";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

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
    console.log("Göndərilən parametrlər:", templateParams);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      setStatus("OTP email göndərildi ✅");
    } catch (error) {
      console.error("Email göndərmə xətası:", error);
      setStatus("Email göndərilmədi ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.password !== value.confirmPass) {
      setStatus("Şifrələr uyğun deyil ❌");
      return;
    }

    const otp = generateOtp();
    setOtpCode(otp);
    await sendOtpEmail(otp);

    setOtpModalOpen(true); // Modal açılır
  };

  const verifyOtp = async () => {
    if (enteredOtp === otpCode) {
      // Register datanı göndər
      try {
        await axios.post(
          "https://67ee3f81c11d5ff4bf78e1b1.mockapi.io/signUp",
          value
        );
        setStatus("Register olundu ✅");
        setOtpModalOpen(false);
      } catch (error) {
        console.log(error);
        setStatus("Register xətası ❌");
      }
    } else {
      setStatus("Yanlış OTP ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Form */}
      <div className="w-full max-w-sm text-center">
        <p className="text-sm text-gray-500">Step 1 of 3</p>
        <h1 className="text-2xl font-semibold mb-6">Create Account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Region */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">Region</label>
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
            <label className="text-sm font-medium text-gray-700"> First Name </label>
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
            <label className="text-sm font-medium text-gray-700"> Last Name </label>
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
            <label className="text-sm font-medium text-gray-700"> Password </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
              name="password"
              onChange={handleChange}
              value={value.password}
            />
          </div>

          {/* Confirm Password */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700"> Confirm Password </label>
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
            <span className="text-gray-700 underline cursor-pointer"> Privacy Notice </span>{" "}
            and{" "}
            <span className="text-gray-700 underline cursor-pointer"> Terms of Use </span>.
          </p>

          <button
            type="submit"
            className="w-full mt-4 bg-[#c2cdfc] hover:bg-[#a4b3f8] text-white rounded-md py-2 font-medium"
          >
            Sign Up
          </button>
        </form>

        {status && <p className="mt-3">{status}</p>}
        {otpCode && <p className="mt-2 text-xs text-gray-400"> Demo üçün OTP: <b>{otpCode}</b> </p>}
      </div>

      {/* OTP Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
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
  );
};

export default SignUp;
