import "./todo-item.css";

type TodoItemProps = {
  title: string;
  date: string;
  description: string;
  onDelete: () => void;
};

export default function TodoItem({
  title,
  date,
  description,
  onDelete,
}: TodoItemProps) {
  return (
    <details className="todo-item">
      <summary>
        <div>
          <input type="checkbox" />
          <p className="todo-title">{title}</p>
          <p className="todo-title">{date}</p>
        </div>
        <p>{date}</p>
        <button className="delete-todo" onClick={onDelete}>
          delete
        </button>
      </summary>
      <p className="todo-description">{description}</p>
    </details>
  );
}
