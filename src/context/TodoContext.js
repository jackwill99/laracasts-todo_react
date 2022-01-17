import React, { createContext, useState, useRef } from "react";
import Toggle from "../hooks/Toggle";
import Localstorage from "../hooks/Localstorage";

export const TodoContext = createContext();

function TodoContextComponent(props) {
    const [todos, setTodos] = Localstorage("todos", []);
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
    let [idForTodo, setIdForTodo] = Localstorage("id", 1);
    let inputTitle = useRef();
    let [but, setBut] = useState("all");
    let [toggleForOne, changeForOne] = Toggle();
    let [toggleForTwo, changeForTwo] = Toggle(false);
    let [name, setName] = Localstorage("name", "");

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
        <TodoContext.Provider
            value={{
                name,
                addTodo,
                onInputHandle,
                inputValue,
                todos,
                checkBut,
                but,
                completeTodo,
                markAsEditting,
                updateTodo,
                cancelEdit,
                inputTitle,
                deleteTodo,
                setName,
                changeForOne,
                changeForTwo,
                toggleForOne,
                toggleForTwo,
                checkAll,
                checkButton,
                clearCompleted,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}

export default TodoContextComponent;
