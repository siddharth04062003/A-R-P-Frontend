import React from "react";

export default function Filters({ semesters, subjects, types, filters, onChange }) {
  const { semester, subject, type } = filters;

  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        Semester:{" "}
        <select value={semester} onChange={(e) => onChange("semester", e.target.value)}>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: 15 }}>
        Subject:{" "}
        <select value={subject} onChange={(e) => onChange("subject", e.target.value)}>
          <option value="">All</option>
          {subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: 15 }}>
        Type:{" "}
        <select value={type} onChange={(e) => onChange("type", e.target.value)}>
          <option value="">All</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
