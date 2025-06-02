import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new todo"
        style={{ padding: "0.5rem", width: "70%" }}
      />
      <button
        type="submit"
        style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
      >
        Add
      </button>
    </form>
  );
}
