const FILTERS = ["all", "pending", "completed"];

export default function FilterBar({ filter, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {FILTERS.map((item) => (
        <button
          key={item}
          type="button"
          className={filter === item ? "selected" : ""}
          aria-pressed={filter === item}
          onClick={() => onChange(item)}
        >
          {item[0].toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}
