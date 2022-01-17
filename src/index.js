import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
// import AppClass from "./components/AppClass";
import reportWebVitals from "./reportWebVitals";
import TodoContextComponent from './context/TodoContext';

ReactDOM.render(
  <React.StrictMode>
    <TodoContextComponent>
      <App />
    </TodoContextComponent>
    {/* <AppClass /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
