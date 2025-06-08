// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulate persisting user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const signIn = (username, password) => {
    // Here you would do real API call & validation

    // For demo, accept any username/password
    const fakeUser = { username };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
    return true;
  };

  const signUp = (username, password) => {
    // For demo, just sign in directly after signup
    return signIn(username, password);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
