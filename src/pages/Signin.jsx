// src/pages/Signin.jsx
import React, { useState, useContext } from "react";
import Heading from "../components/FundamentalComp/Heading";
import SubHeading from "../components/FundamentalComp/SubHeading";
import InputBox from "../components/FundamentalComp/InputBox";
import Button from "../components/FundamentalComp/Button";
import Bottom from "../components/FundamentalComp/Bottom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch("https://a-r-p-backend.onrender.com/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store JWT token or whatever your API returns
        localStorage.setItem("token", data.token);

        // Update user in context (you can customize signIn to accept user/token info)
        signIn(email, password); 

        // Navigate to protected resource page after successful login
        navigate("/resources");
      } else if (response.status === 401) {
        alert("Invalid credentials, please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            label="Email"
            placeholder="johndoe@example.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label="Password"
            placeholder="example@123"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button label="Sign in" onClick={handleSignIn} />
          </div>
          <Bottom label="Don't have an account?" linkText="Sign Up" to="/signup" />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
