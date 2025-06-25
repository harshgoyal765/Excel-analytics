import React, { useState } from "react";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const [formType, setFormType] = useState("signin");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
   const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   setError("");

  //   try {
  //     const res = await axios.post("http://localhost:3000/api/login", formData);
  //     if (res.data.success) {
  //       alert("Signed in successfully!");
  //     } else {
  //       setError("Invalid email or password");
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Server error");
  //   }
  // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
         email: formData.email,
      password: formData.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/Signup");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center p-8">
      <div className="bg-white border border-black rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">
            {formType === "signin" ? "Sign In" : "Sign Up"}
          </h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6 bg-gray-100 rounded-full p-1">
          <button
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition ${
              formType === "signin"
                ? "bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white"
                : "text-black"
            }`}
            onClick={() => setFormType("signin")}
          >
            Signin
          </button>
          <button
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition ${
              formType === "signup"
                ? "bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white"
                : "text-black"
            }`}
            onClick={() => setFormType("signup")}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        {formType === "signin" ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white py-2 rounded-full hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>
        ) : (
          <SignupForm onSwitch={setFormType} />
        )}

        {/* Switch Link */}
        <div className="flex justify-center items-center mt-6 text-sm">
          <p className="mr-2">
            {formType === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <a
            href="#"
            className="text-blue-700 font-medium hover:underline hover:text-red-600"
            onClick={(e) => {
              e.preventDefault();
              setFormType(formType === "signin" ? "signup" : "signin");
            }}
          >
            {formType === "signin" ? "Sign up" : "Sign in"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
