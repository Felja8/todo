// src/App.js
import React, { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api/todos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTodos()
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load todos");
        setLoading(false);
      });
  }, []);

  // Handler: Add a new todo
  const handleAdd = async (title) => {
    try {
      const newTodo = await createTodo(title);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error(err);
      setError("Failed to create todo");
    }
  };

  const handleToggle = async (id, newCompleted) => {
    try {
      const existing = todos.find((t) => t.id === id);
      if (!existing) return;
      const updated = await updateTodo(id, {
        title: existing.title,
        completed: newCompleted,
      });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
      setError("Failed to update todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1>My Todo List</h1>

      {/* Show loading / error */}
      {loading && <p>Loading todos…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {/* TodoForm for adding */}
      <TodoForm onAdd={handleAdd} />

      {/* TodoList for displaying */}
      {!loading && !error && (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
