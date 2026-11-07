export default function Footer({ remaining, completed, onClearCompleted }) {
  return (
    <footer className="todo-footer">
      <p>
        <strong>{remaining}</strong> {remaining === 1 ? "task" : "tasks"}{" "}
        remaining
      </p>

      {completed > 0 && (
        <button type="button" className="clear-btn" onClick={onClearCompleted}>
          Clear completed ({completed})
        </button>
      )}
    </footer>
  );
}
