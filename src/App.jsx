import { useEffect, useState } from "react";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = "https://cc17-assessment-api.onrender.com/v1/todo";
  const userId = "23";

  // 1. Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?userId=${userId}`);
      setTodos(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Delete
  const deleteTodo = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${id}?userId=${userId}`);
      setTodos((prev) => {
        return prev.reduce((acc, todo) => {
          if (todo.id !== id) {
            acc.push(todo);
          }
          return acc;
        }, []);
      });
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  // 3. Add
  const addTodo = async (newTitle) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}?userId=${userId}`, {
        title: newTitle,
      });
      setTodos((prev) => [response.data.data, ...prev]);
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  // 4. Edit
  // 4.1 Edit Text
  const editTodo = async (id, checked, editTitle) => {
    setIsLoading(true);
    try {
      await axios.patch(`${BASE_URL}/${id}?userId=${userId}`, {
        title: editTitle,
        status: checked,
      });
      setTodos((prev) => {
        return prev.reduce((acc, todo) => {
          if (todo.id === id) {
            acc.push({ ...todo, title: editTitle, status: checked });
          } else {
            acc.push(todo);
          }
          return acc;
        }, []);
      });
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="app">
      <div className="todo">
        <div className="todo__head">
          <h1>My Todo</h1>
          <div className="img__container">
            <img src="https://freesvg.org/img/rocket-312767.png" />
          </div>
        </div>
        <header className="todo__add">
          <TodoAdd addTodo={addTodo} />
        </header>
        <TodoList
          todos={todos}
          isLoading={isLoading}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        <button className="logout">LOGOUT</button>
      </div>
    </div>
  );
}

export default App;
