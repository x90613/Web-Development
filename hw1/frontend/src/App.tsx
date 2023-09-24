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
  date: string;
  tag: string;
  mood: string;
  description: string;
};

function App() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [todoDate, setTodoDate] = useState("2023-09-01");
  const [todoTag, setTodoTag] = useState("學業");
  const [todoMood, setTodoMood] = useState("快樂");
  const [todoDescription, setTodoDescription] = useState("");

  //function getName

  async function init() {
    try{
      const todos = await getTodos();
      setTodos(todos)
    }catch(error){
      alert("Failed to load todos");
    }
  }

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
    const queryReq = { id: uuidv4(), date: todoDate, tag: todoTag, mood: todoMood, description: todoDescription };
    //console.log(queryReq);
    await createTodo(queryReq);
    init(); //重新getAllData
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
        <select className="form-select" aria-label="Default select example"
          value={todoTag} onChange={(e) => setTodoTag(e.target.value)}>
        <option defaultValue="學業">學業</option>
        <option value="人際">人際</option>
        <option value="社團">社團</option>
        </select>
        <select className="form-select" aria-label="Default select example"
          value={todoMood} onChange={(e) => setTodoMood(e.target.value)}>
        <option defaultValue="快樂">快樂</option>
        <option value="生氣">生氣</option>
        <option value="難過">難過</option>
        </select>
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
            date={todo.date}
            tag={todo.tag}
            mood={todo.mood}
            description={todo.description}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </section>
    </>
  );
}

export default App;
