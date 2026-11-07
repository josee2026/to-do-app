import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  function saveEdit(e) {
    e.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle || cleanTitle.length > 100) {
      alert("Enter a task between 1 and 100 characters.");
      return;
    }

    onEdit(task.id, cleanTitle, priority);
    setEditing(false);
  }

  function cancelEdit() {
    setTitle(task.title);
    setPriority(task.priority);
    setEditing(false);
  }

  return (
    <li className={`task-item ${task.done ? "done" : ""}`}>
      {editing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            aria-label="Edit task title"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Edit task priority"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button type="submit" className="save-btn">
            Save
          </button>

          <button type="button" className="cancel-btn" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <label className="task-label">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggle(task.id)}
            />

            <span className="task-title">{task.title}</span>
          </label>

          <span className={`priority ${task.priority}`}>{task.priority}</span>

          <div className="task-actions">
            <button
              type="button"
              className="edit-btn"
              onClick={() => setEditing(true)}
              disabled={task.done}
              aria-label={`Edit ${task.title}`}
            >
              Edit
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              ✕
            </button>
          </div>
        </>
      )}
    </li>
  );
}
