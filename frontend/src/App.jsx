import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import SignInForm from "./components/SignInForm";
import SignupForm from "./components/SignupForm";

const App = () => {
  return (
    <Routes>
      <Route path="/Signin" element={<SignInForm />} />
      <Route path="/Signup" element={<SignupForm />} />
      
    </Routes>
  );
};

export default App;
