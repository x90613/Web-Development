import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import TodoItem from "./components/TodoItem";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

type TodoData = {
  id: string;
  title: string;
  date: string;
  description: string;
};

function App() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [todoDate, setTodoDate] = useState(new Date().toString());
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  async function init() {
    try{
      const todos = await getTodos();
      setTodos(todos)
    }catch(error){
      alert("Failed to load todos");
    }
  }
  init()

  useEffect(() => {
    init();
  }, []);

  const addTodo = async() => {
    // if (todoTitle === "") {
    //   alert("Please enter a title for your todo.");
    //   return;
    // }
    if (todoDescription === "") {
      alert("Please enter a description for your todo.");
      return;
    }
    // setTodos([
    //   ...todos,
    //   { id: uuidv4(), title: todoTitle, description: todoDescription },
    // ]);
    const queryReq = { id: uuidv4(), title: todoTitle, date: todoDate, description: todoDescription };
    await createTodo(queryReq);
    init(); //重新getAllData
    setTodoTitle("");
    setTodoDescription("");
  };

  const deleteTodo = async(id: string) => {
    await deleteTodoById(id)
    init();
    //setTodos(todos.filter((todo) => todo.id !== id));
  };

  async function getTodos() {
    const response = await instance.get("/todos");
    return response.data;
  }

  async function createTodo(todo:TodoData) {
    const response = await instance.post("/todos", todo);
    return response.data;
  }

  async function deleteTodoById(id:string) {
    const response = await instance.delete(`/todos/${id}`);
    return response.data;
  }
  

  return (
    <>
      <h1>My Diary</h1>
      <div id="todo-input-container">
        <input id="date" type="date" value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
        />
        <input
          type="text"
          id="todo-input"
          placeholder="new todo"
          tabIndex={1}
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button id="todo-add" tabIndex={3} onClick={addTodo}>
          add
        </button>
      </div>
      <textarea
        id="todo-description-input"
        placeholder="description"
        tabIndex={2}
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      ></textarea>
      <section id="todos">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            date={todo.date}
            description={todo.description}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </section>
    </>
  );
}

export default App;
