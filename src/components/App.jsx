import { useState, useRef } from "react";
import "../reset.css";
import "../App.css";
import NoTodo from "./NoTodo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Toggle from "../hooks/Toggle";
import Localstorage from "../hooks/Localstorage";

function App() {
  const [todos,setTodos] = Localstorage('todos',[])
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     title: "Finish React Series",
  //     isComplete: false,
  //     isEditting: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Go Grocery",
  //     isComplete: false,
  //     isEditting: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Take over world",
  //     isComplete: false,
  //     isEditting: false,
  //   },
  // ]);
  let [inputValue, setInputValue] = useState("");
  let [idForTodo, setIdForTodo] = Localstorage('id',1);
  let inputTitle = useRef();
  let [but, setBut] = useState("all");
  let [toggleForOne,changeForOne] = Toggle();
  let [toggleForTwo,changeForTwo] = Toggle(false);
  let [name, setName] = Localstorage('name','')

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

  // const remainingItems = () => {
  //   return todos.filter((todo) => !todo.isComplete).length;
  // };

  // 💡 useMemo ==> it accepts a function and a list of dependencies but it returns the memoized value returned by the passed function. It recalculated the value only when one of its dependencies change. It is useful to avoid expensive calculations on every render when the returned value is not going to change.

  // 💡 useEffect ==> A hook that helps us to perform mutations, subscriptions, timers, logging, and other side effects after all the components has been rendered. The useEffect accepts a function that is imperative in nature and a list of dependencies. When its dependencies change it executes the passed function.

  const checkAll = () => {
    setTodos(
      todos.map((todo) => {
        return { ...todo, isComplete: true };
      })
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isComplete));
  };

  const all = () => todos;
  const active = () => todos.filter((todo) => !todo.isComplete);
  const complete = () => todos.filter((todo) => todo.isComplete);

  let checkBut = (value) => {
    switch (value) {
      case "all":
        return all();
      case "active":
        return active();
      case "complete":
        return complete();
      default:
        console.log("Invalid button");
    }
  };
  let checkButton = (value) => setBut(value);

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <input type="text" placeholder="What is your name? " name="name" className="todo-input" value={name} onChange={(event)=> setName(event.target.value)}/>
        <p htmlFor="name" className="nameLabel">Hello, {name} </p>
        <h2>Todo App</h2>

        <TodoForm
          addTodo={addTodo}
          inputValue={inputValue}
          onInputHandle={onInputHandle}
        />

        {todos.length > 0 ? (
          <>
            <ul className="todo-list">
              {checkBut(but).map((todo, index) => (
                <TodoList
                  todo={todo}
                  completeTodo={completeTodo}
                  markAsEditting={markAsEditting}
                  updateTodo={updateTodo}
                  cancelEdit={cancelEdit}
                  inputTitle={inputTitle}
                  deleteTodo={deleteTodo}
                  key={todo.id}
                />
              ))}
            </ul>

            <div className="toggle-container">
              <div className="toggleOne" onClick={changeForOne}>Toggle One Features</div>
              <div className="toggleTwo" onClick={changeForTwo}>Toggle Two Features</div>
            </div>

            {toggleForOne && (
            <div className="check-all-container">
              <div>
                <div className="button" onClick={checkAll}>
                  Check All
                </div>
              </div>

              <span>
                {checkBut(but).length} {but !== "complete" ? "remaining" : ""} items
              </span>
            </div>
            )}


            {toggleForTwo && (
            <div className="other-buttons-container">
              <div>
                <button
                  className={`button filter-button ${
                    but === "all" ? "filter-button-active" : ""
                  }`}
                  onClick={() => checkButton("all")}
                >
                  All
                </button>
                <button
                  className={`button filter-button ${
                    but === "active" ? "filter-button-active" : ""
                  }`}
                  onClick={() => checkButton("active")}
                >
                  Active
                </button>
                <button
                  className={`button filter-button ${
                    but === "complete" ? "filter-button-active" : ""
                  }`}
                  onClick={() => checkButton("complete")}
                >
                  Completed
                </button>
              </div>
              <div>
                <button className="button" onClick={clearCompleted}>
                  Clear completed
                </button>
              </div>
            </div>
            )}
          </>
        ) : (
          <NoTodo />
        )}
      </div>
    </div>
  );
}

export default App;
