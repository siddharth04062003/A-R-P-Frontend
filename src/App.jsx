// src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import SignIn from "../src/pages/Signin";
import SignUp from "./pages/Signup";
import Resources from "./pages/Resources";

import AuthContext, { AuthProvider } from "./context/AuthContext";

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          { <Route path="/signin" element={<SignIn />} /> }
          { <Route path="/signup" element={<SignUp />} /> }

          {/* Protected Route */}
          <Route
            path="/resources"
            element={
              <RequireAuth>
                <Resources />
              </RequireAuth>
            }
          />

          {/* Redirect unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
