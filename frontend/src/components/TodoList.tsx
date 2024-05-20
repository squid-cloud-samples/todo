import TodoCard from "./TodoCard";
import "./TodoList.scss";
import { Todo } from "../../../common/types";

type PropTypes = {
  todos: Array<Todo>;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const TodoList = ({ todos, onDelete, onToggle }: PropTypes) => {
  return (
    <div className="todo-list">
      <div className="todo-list__column">
        {todos.map((todo) => (
          <TodoCard
            key={todo.__id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
