import React, { useEffect, useState } from "react";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "1rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    justifyContent: "center",
  },
  select: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
    gap: "1rem",
  },
  card: {
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
  },
  cardDesc: {
    flexGrow: 1,
    marginBottom: "0.75rem",
    color: "#555",
  },
  cardLink: {
    color: "#2c7744",
    textDecoration: "none",
    fontWeight: "600",
  },
  cardType: {
    marginTop: "auto",
    fontSize: "0.9rem",
    fontStyle: "italic",
    color: "#777",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.25rem",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: "1.1rem",
  },
};

const subjects = ["All", "DSA", "DBMS", "OS", "CN"]; // example subjects
const types = ["All", "Video", "Book", "Notes"];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [semester, setSemester] = useState("6"); // example default sem
  const [subject, setSubject] = useState("All");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResources = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `http://localhost:600/api/resources/${semester}?`;

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
      <h1 style={styles.heading}>Resources - Semester {semester}</h1>

      <div style={styles.filters}>
        <select
          style={styles.select}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          aria-label="Select semester"
        >
          {[...Array(8).keys()].map((i) => (
            <option key={i+1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <select
          style={styles.select}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-label="Filter by subject"
        >
          {subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>

        <select
          style={styles.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filter by type"
        >
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={styles.loading}>Loading resources...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : resources.length === 0 ? (
        <p style={styles.loading}>No resources found.</p>
      ) : (
        <div style={styles.cardsContainer}>
          {resources.map((r) => (
            <div key={r._id} style={styles.card}>
              <h3 style={styles.cardTitle}>{r.title}</h3>
              <p style={styles.cardDesc}>{r.description}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.cardLink}
              >
                Open Resource
              </a>
              <p style={styles.cardType}>Type: {r.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
