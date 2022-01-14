import { useState, useRef } from "react";
import "../reset.css";
import "../App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditting: false,
    },
    {
      id: 2,
      title: "Go Grocery",
      isComplete: false,
      isEditting: false,
    },
    {
      id: 3,
      title: "Take over world",
      isComplete: false,
      isEditting: false,
    },
  ]);
  let [inputValue, setInputValue] = useState("");
  let [idForTodo, setIdForTodo] = useState(4);
  let inputTitle = useRef();

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

  let completeTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updateTodos);
  };

  let markAsEditting = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditting = !todo.isEditting;
      }
      return todo;
    });

    setTodos(updateTodos);
  };

  let updateTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (inputTitle.current.value.length === 0) {
          todo.isEditting = !todo.isEditting;
          return todo;
        }
        todo.title = inputTitle.current.value;
        todo.isEditting = !todo.isEditting;
      }
      return todo;
    });

    setTodos(updateTodos);
  };

  const cancelEdit = (id) => {
    let updateTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditting = !todo.isEditting;
      }
      return todo;
    });
    setTodos(updateTodo);
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
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  chacked={todo.isComplete && true}
                />
                {!todo.isEditting ? (
                  <span
                    onDoubleClick={() => markAsEditting(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    onBlur={() => updateTodo(todo.id)}
                    onKeyDown={(event) => {
                      console.log(event.key);
                      if (event.key === "Enter") {
                        updateTodo(todo.id);
                      } else if (event.key === "Escape") {
                        cancelEdit(todo.id);
                      }
                    }}
                    type="text"
                    className="todo-item-input"
                    defaultValue={todo.title}
                    ref={inputTitle}
                    autoFocus
                  />
                  //! In input, defaultValue is only temporary value and you can change later. If you use 'value' , this will be always value.
                )}
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
