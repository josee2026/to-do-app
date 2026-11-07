import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("my-todo-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("my-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Display feedback messages
  function showMessage(text) {
    setMessage(text);
  }

  // Add task
  function addTask(title, priority) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      priority,
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    showMessage("Task added successfully!");
  }

  // Edit task
  function editTask(id, newTitle, newPriority) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, priority: newPriority }
          : task,
      ),
    );

    showMessage("Task updated successfully!");
  }

  // Complete or activate task
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );

    showMessage("Task status updated!");
  }

  // Delete task with confirmation
  function deleteTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (!confirmed) return;

    setTasks((prev) => prev.filter((task) => task.id !== id));
    showMessage("Task deleted successfully!");
  }

  // Clear completed tasks
  function clearCompleted() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all completed tasks?",
    );

    if (!confirmed) return;

    setTasks((prev) => prev.filter((task) => !task.done));
    showMessage("Completed tasks cleared!");
  }

  // Search and filter tasks
  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "completed"
          ? task.done
          : filter === "pending"
            ? !task.done
            : true;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, filter, search]);

  const remaining = tasks.filter((task) => !task.done).length;
  const completed = tasks.filter((task) => task.done).length;

  return (
    <div className="page">
      <main className="todo-app">
        <header className="app-header">
          <div className="logo">✓</div>
          <p className="welcome">PERSONAL TASK MANAGER</p>
          <h1>My Tasks</h1>
          <p className="subtitle">Plan your day. Focus on what matters.</p>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <h2>{remaining}</h2>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <h2>{completed}</h2>
          </div>
        </section>

        {message && (
          <div className="feedback" role="status">
            {message}
            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        <section className="task-section">
          <h2 className="section-title">Create a task</h2>

          <TaskForm onAdd={addTask} />

          <div className="list-heading">
            <h2>My task list</h2>
            <span>{visibleTasks.length} shown</span>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search your tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tasks"
          />

          <FilterBar filter={filter} onChange={setFilter} />

          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />

          <Footer
            remaining={remaining}
            completed={completed}
            onClearCompleted={clearCompleted}
          />
        </section>

        <p className="copyright">Stay organized. Stay productive.</p>
      </main>
    </div>
  );
}
