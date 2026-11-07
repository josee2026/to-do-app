import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Please enter a task before adding.");
      return;
    }

    if (cleanTitle.length > 100) {
      setError("Task must be 100 characters or fewer.");
      return;
    }

    onAdd(cleanTitle, priority);
    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        maxLength={100}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        aria-label="Task title"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Task priority"
      >
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>

      <button type="submit" className="add-btn">
        + Add Task
      </button>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
