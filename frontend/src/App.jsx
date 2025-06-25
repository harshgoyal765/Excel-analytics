import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import SignInForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/Signup" element={<SignupForm />} />
      <Route path="/Signin" element={<SignInForm />} />
    </Routes>
  );
};

export default App;
