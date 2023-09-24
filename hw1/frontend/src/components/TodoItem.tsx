import "./todo-item.css";

type TodoItemProps = {
  date: string;
  tag: string;
  mood: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TodoItem({
  date,
  tag,
  mood,
  description,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <details className="todo-item">
      <summary>
        {/*<div>
          <input type="checkbox" />
        </div>*/}
        <p>{date}</p>
        <p>{tag}</p>
        <p>{mood}</p>
        <button className="edit-todo" onClick={onEdit}>
          edit
        </button>
        <button className="delete-todo" onClick={onDelete}>
          delete
        </button>
      </summary>
      <p className="todo-description">{description}</p>
    </details>
  );
}
