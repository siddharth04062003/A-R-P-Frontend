import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #5a3f37, #2c7744)",
    color: "white",
    padding: "2rem",
    textAlign: "center",
  },
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
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
  footer: {
    textAlign: "center",
    fontSize: "0.9rem",
    marginTop: "2rem",
    paddingTop: "1rem",
    borderTop: "1px solid rgba(255,255,255,0.3)",
    width: "100%",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "0.95rem",
  },
};

export default function Landing() {
  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.heading}>Academic Resources</h1>
        <p style={styles.subtext}>
          Your one-stop platform for semester-wise study materials. Access videos,
          books, notes, and more to boost your learning!
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/signin">
            <button
              style={styles.buttonPrimary}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              Sign In
            </button>
          </Link>
          <Link to="/admin-login">
            <button
              style={styles.buttonPrimary}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              Admin Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              style={styles.buttonSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#2c7744";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      <div style={styles.footer}>
        <p>
          Made with ❤️ by <strong>Siddharth</strong> & <strong>Nabeel</strong>
        </p>
        <div style={styles.socialLinks}>
          {/* Siddharth Links */}
          <a href="https://www.linkedin.com/in/sidga04" target="_blank" rel="noreferrer" style={styles.link}>
            Siddharth LinkedIn
          </a>
          <a href="https://x.com/siddharth462003" target="_blank" rel="noreferrer" style={styles.link}>
            Siddharth Twitter
          </a>
          <a href="https://github.com/siddharth04062003" target="_blank" rel="noreferrer" style={styles.link}>
            Siddharth GitHub
          </a>
          <a href="https://www.instagram.com/_siddharth04_/" target="_blank" rel="noreferrer" style={styles.link}>
            Siddharth Insta
          </a>

          {/* Nabeel Links */}
          <a href="https://www.linkedin.com/in/nabeelakhter14/" target="_blank" rel="noreferrer" style={styles.link}>
            Nabeel LinkedIn
          </a>
          <a href="https://x.com/avgCodeForcer" target="_blank" rel="noreferrer" style={styles.link}>
            Nabeel Twitter
          </a>
          <a href="https://github.com/wannabetolkien" target="_blank" rel="noreferrer" style={styles.link}>
            Nabeel GitHub
          </a>
          <a href="https://www.instagram.com/wannabenabeel?igsh=dTBkNjVteWx1dnN6" target="_blank" rel="noreferrer" style={styles.link}>
            Nabeel Insta
          </a>
        </div>
      </div>
    </div>
  );
}
