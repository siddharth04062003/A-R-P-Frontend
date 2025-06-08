import React, { useState } from "react";
import axios from "axios";

const AddResource = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    semester: "",
    subject: "",
    type: "",
    url: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      setMessage("❌ Unauthorized. Please log in as admin.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:600/api/admin/add-resource",
        formData,
        {
          headers: {
            "Content-Type" :"application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Resource added successfully!");
      setFormData({
        title: "",
        description: "",
        semester: "",
        subject: "",
        type: "",
        url: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to add resource.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📚 Add New Resource</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="semester"
            placeholder="Semester"
            value={formData.sem}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="subject"
            placeholder="Subject"
            value={formData.sub}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="type"
            placeholder="Type (PDF, Link, etc.)"
            value={formData.type}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="url"
            placeholder="Resource URL"
            value={formData.url}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Add Resource</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
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
    padding: "20px",
  },
  card: {
    backgroundColor: "#fefefe",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(229, 57, 53, 0.15)",
    border: "2px solid #e53935",
    width: "100%",
    maxWidth: "480px",
  },
  heading: {
    textAlign: "center",
    color: "#e53935",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "#e53935",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  message: {
    marginTop: "16px",
    color: "#d32f2f",
    textAlign: "center",
    fontWeight: "500",
  },
};

export default AddResource;
