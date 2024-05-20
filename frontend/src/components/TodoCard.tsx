import dayjs from "dayjs";
import "./TodoCard.scss";
import { Todo } from "../../../common/types";

import TrashIcon from "@squidcloud/ui/icons/trash.svg";

type PropTypes = {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const TodoCard = ({ todo, onDelete, onToggle }: PropTypes) => {
  const { __id, title, content, createdAt, updatedAt, done } = todo;

  return (
    <div
      className={`sq-card sq-card--elevation2 todo-card ${done ? "done" : ""}`}
    >
      <div className="todo-card__content">
        <h6>{title}</h6>
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
          onChange={() => onToggle(__id, !done)}
        />
        <button onClick={() => onDelete(__id)}>
          <img src={TrashIcon} width={32} className="sq-icon sq-icon--gray" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
