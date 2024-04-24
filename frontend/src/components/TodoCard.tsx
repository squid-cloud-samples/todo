import dayjs from "dayjs";
import "./TodoCard.scss";
import { Todo } from "../../../common/types";

type PropTypes = {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const TodoCard = ({ todo, onDelete, onToggle }: PropTypes) => {
  const { id, title, content, createdAt, updatedAt, done } = todo;

  return (
    <div className={`todo-card ${done ? "done" : ""}`}>
      <div className="todo-card__content">
        <span>{title}</span>
        <span>{content}</span>
        <span className="todo-card__created">
          Created At: {dayjs(createdAt).format("MMM DD h:mm:ssa")}
        </span>
        <span className="todo-card__updated">
          Updated At: {dayjs(updatedAt).format("MMM DD h:mm:ssa")}
        </span>
      </div>
      <div className="todo-card__buttons">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id, !done)}
        />
        <button onClick={() => onDelete(id)}>X</button>
      </div>
    </div>
  );
};

export default TodoCard;
