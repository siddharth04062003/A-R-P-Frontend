import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(90deg, #5a3f37, #2c7744)",
    color: "white",
    padding: "2rem",
    textAlign: "center",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "1rem",
    textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
  },
  subtext: {
    fontSize: "1.25rem",
    maxWidth: "600px",
    marginBottom: "2rem",
    textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
  },
  buttonPrimary: {
    padding: "0.75rem 2rem",
    backgroundColor: "white",
    color: "#2c7744",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 3px 7px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s ease",
  },
  buttonPrimaryHover: {
    backgroundColor: "#f0f0f0",
  },
  buttonSecondary: {
    padding: "0.75rem 2rem",
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  buttonSecondaryHover: {
    backgroundColor: "white",
    color: "#2c7744",
  },
};

export default function Landing() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Academic Resources</h1>
      <p style={styles.subtext}>
        Your one-stop platform for semester-wise study materials. Access videos,
        books, notes, and more to boost your learning!
      </p>
      <div style={styles.buttonGroup}>
        <Link to="/signin">
          <button
            style={styles.buttonPrimary}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "white")}
          >
            Sign In
          </button>
        </Link>
        <Link to="/admin-login">
          <button
            style={styles.buttonPrimary}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "white")}
          >
            Admin Login
          </button>
        </Link>
        <Link to="/signup">
          <button
            style={styles.buttonSecondary}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#2c7744";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "white";
            }}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
