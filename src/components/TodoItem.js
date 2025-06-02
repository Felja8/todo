import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const { id, title, completed } = todo;

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, !completed)}
        style={{ marginRight: "0.5rem" }}
      />
      <span
        style={{
          flexGrow: 1,
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </span>
      <button
        onClick={() => onDelete(id)}
        style={{
          background: "crimson",
          color: "white",
          border: "none",
          padding: "0.25rem 0.5rem",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </li>
  );
}
