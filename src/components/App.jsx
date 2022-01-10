import { useState } from "react";
import "../reset.css";
import "../App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
    },
    {
      id: 2,
      title: "Go Grocery",
      isComplete: true,
    },
    {
      id: 3,
      title: "Take over world",
      isComplete: false,
    },
  ]);

  let [inputValue, setInputValue] = useState("");
  let [idForTodo, setIdForTodo] = useState(4);

  let addTodo = (event) => {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      { id: idForTodo, title: inputValue, isComplete: false },
    ]);
    setInputValue(" ");
    setIdForTodo((previousId) => previousId + 1);
  };

  let onInputHandle = (event) => {
    setInputValue(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            value={inputValue}
            onChange={onInputHandle}
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li className="todo-item-container" key={todo.id}>
              <div className="todo-item">
                <input type="checkbox" />
                <span className="todo-item-label">{todo.title}</span>
                {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
              </div>
              <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
