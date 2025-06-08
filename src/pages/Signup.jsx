import React, { useState } from "react";
import Heading from "../components/FundamentalComp/Heading";
import SubHeading from "../components/FundamentalComp/SubHeading";
import InputBox from "../components/FundamentalComp/InputBox";
import Button from "../components/FundamentalComp/Button";
import Bottom from "../components/FundamentalComp/Bottom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
          <Heading label="Sign Up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            type="text"
            placeholder="John Doe"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputBox
            type="text"
            placeholder="UID1234"
            label="UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
          <InputBox
            type="text"
            placeholder="johndoe@example.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            type="text"
            placeholder="6th"
            label="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
          <InputBox
            type="password"
            placeholder="password@123"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label="Sign Up"
              onClick={async () => {
                const signupData = { name, email, uid, semester, password };
                console.log("Sending signup data:", signupData);

                try {
                  const response = await fetch(
                    "http://localhost:600/api/user/signup",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(signupData),
                    }
                  );

                  if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Signup failed:", errorData);
                    alert(
                      `Signup failed: ${
                        errorData.message || "Please check your input"
                      }`
                    );
                    return;
                  }

                  const data = await response.json();
                  console.log("Signup success response:", data);

                  setName("");
                  setUid("");
                  setEmail("");
                  setSemester("");
                  setPassword("");

                  navigate("/signin");
                } catch (error) {
                  console.error("Error during sign up:", error);
                  alert("An error occurred. Please try again.");
                }
              }}
            />
          </div>
          <Bottom label="Already have an account?" linkText="Login" to="/signin" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
