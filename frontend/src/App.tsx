import "./App.css";
import "@squidcloud/ui/styles/index.css";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import CreateWithAI from "./components/CreateWithAI";
import { Todo } from "../../common/types";

function App() {
  const data: Array<Todo> = [];

  const handleCreate = async (data: Pick<Todo, "title" | "content">) => {
    const { title, content } = data;
    console.log("handleCreate", title, content);
  };

  const handleToggle = async (id: string, done: boolean) => {
    console.log("handleToggle", id, done);
  };

  const handleDelete = async (id: string) => {
    console.log("handleDelete", id);
  };

  const handleCleanTodos = async () => {
    console.log("handleCleanTodos");
  };

  const handleCreateWithAI = async (data: { task: string }) => {
    const { task } = data;
    console.log("handleCreateWithAI", task);
  };

  return (
    <>
      <div className="app-buttons">
        <AddTodo onCreate={handleCreate} />
        <button className="sq-btn sq-btn--secondary" onClick={handleCleanTodos}>
          Clean Todos
        </button>
        <CreateWithAI onCreateWithAI={handleCreateWithAI} />
      </div>

      <TodoList todos={data} onDelete={handleDelete} onToggle={handleToggle} />
    </>
  );
}

export default App;
