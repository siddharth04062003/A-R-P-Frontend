import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:600/api/admin/login", {
        email,
        password
      });

      const token = res.data.token;
      localStorage.setItem("adminToken", token);
      navigate("/admin/add-resource");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🔐 Admin Login</h2>
        <form onSubmit={handleAdminLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(255,0,0,0.2)",
    width: "350px",
    border: "2px solid #e53935",
  },
  heading: {
    marginBottom: "24px",
    textAlign: "center",
    color: "#e53935",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#e53935",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  error: {
    marginTop: "12px",
    color: "#b71c1c",
    textAlign: "center",
  },
};

export default AdminLogin;
