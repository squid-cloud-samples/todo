import TodoCard from "./TodoCard";
import "./TodoList.scss";
import { useMemo } from "react";

type PropTypes = {
  todos: Array<any>;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const TodoList = ({ todos, onDelete, onToggle }: PropTypes) => {
  return (
    <div className="todo-list">
      <div className="todo-list__column">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
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
