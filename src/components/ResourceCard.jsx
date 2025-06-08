// src/pages/Resources.jsx
import React, { useState, useEffect, useContext } from "react";
import Filters from "../components/Filters";
import ResourceCard from "../components/ResourceCard";
import { fetchResources } from "../services/api";
import AuthContext from "../context/AuthContext";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const subjects = ["DSA", "DBMS", "CN"];
const types = ["Video", "Book", "Notes"];

export default function Resources() {
  const { signOut, user } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    semester: "1",
    subject: "",
    type: "",
  });

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    async function loadResources() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchResources(filters);
        setResources(data);
      } catch (err) {
        setError(err.message);
        setResources([]);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, [filters]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1>Academic Resources</h1>
        <div>
          <span style={{ marginRight: 10 }}>Hello, {user.username}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>

      <Filters
        semesters={semesters}
        subjects={subjects}
        types={types}
        filters={filters}
        onChange={handleFilterChange}
      />

      {loading && <p>Loading resources...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && resources.length === 0 && <p>No resources found.</p>}

      <div>
        {resources.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
