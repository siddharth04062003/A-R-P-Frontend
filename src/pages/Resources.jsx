import React, { useEffect, useState } from "react";

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "3rem auto",
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(to right, #f0f9ff, #e0f7fa)",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  },
  heading: {
    fontSize: "2.75rem",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#005f73",
    fontWeight: 700,
  },
  filters: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "2.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  select: {
    padding: "0.7rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #bbb",
    background: "#ffffff",
    color: "#333",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
  },
  card: {
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s, box-shadow 0.3s",
  },
  cardHover: {
    transform: "scale(1.02)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },
  cardTitle: {
    fontWeight: 700,
    marginBottom: "0.6rem",
    fontSize: "1.4rem",
    color: "#0a4d68",
  },
  cardDesc: {
    flexGrow: 1,
    marginBottom: "0.75rem",
    color: "#444",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },
  cardLink: {
    color: "#0077b6",
    textDecoration: "none",
    fontWeight: "600",
    marginTop: "0.5rem",
  },
  cardType: {
    marginTop: "1rem",
    fontSize: "0.85rem",
    fontStyle: "italic",
    color: "#666",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.3rem",
    color: "#0077b6",
  },
  error: {
    textAlign: "center",
    color: "#e63946",
    fontSize: "1.15rem",
  },
};

const subjects = ["All", "DSA", "DBMS", "OS", "CN"];
const types = ["All", "Video", "Book", "Notes"];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [semester, setSemester] = useState("6");
  const [subject, setSubject] = useState("All");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResources = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `https://a-r-p-backend.onrender.com/api/resources/${semester}?`;
      if (subject !== "All") url += `subject=${encodeURIComponent(subject)}&`;
      if (type !== "All") url += `type=${encodeURIComponent(type)}&`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch resources");
      const data = await response.json();
      setResources(data);
    } catch (err) {
      setError(err.message);
      setResources([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, [semester, subject, type]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📚 Resources - Semester {semester}</h1>

      <div style={styles.filters}>
        <select
          style={styles.select}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          {[...Array(8).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              Semester {i + 1}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={styles.loading}>🔄 Loading resources...</p>
      ) : error ? (
        <p style={styles.error}>❌ {error}</p>
      ) : resources.length === 0 ? (
        <p style={styles.loading}>📭 No resources found.</p>
      ) : (
        <div style={styles.cardsContainer}>
          {resources.map((r) => (
            <div
              key={r._id}
              style={{
                ...styles.card,
                ":hover": styles.cardHover,
              }}
              onMouseOver={(e) => {
                Object.assign(e.currentTarget.style, styles.cardHover);
              }}
              onMouseOut={(e) => {
                Object.assign(e.currentTarget.style, styles.card);
              }}
            >
              <h3 style={styles.cardTitle}>{r.title}</h3>
              <p style={styles.cardDesc}>{r.description}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.cardLink}
              >
                🔗 Open Resource
              </a>
              <p style={styles.cardType}>📌 Type: {r.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
