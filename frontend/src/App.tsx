import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import CreateWithAI from "./components/CreateWithAI";

function App() {
  const data = [];

  const handleCreate = async (data) => {
    const { title, content } = data;
    console.log("handleCreate", title, content)
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

  const handleCreateWithAI = async (data) => {
    const { task } = data;
    console.log("handleCreateWithAI", task);
  };

  return (
    <>
      <div className="app-buttons">
        <AddTodo onCreate={handleCreate} />
        <button onClick={handleCleanTodos}>Clean Todos</button>
        <CreateWithAI onCreateWithAI={handleCreateWithAI} />
      </div>

      <TodoList todos={data} onDelete={handleDelete} onToggle={handleToggle} />
    </>
  );
}

export default App;
