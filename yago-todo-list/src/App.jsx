import "./App.css";
import { useState, useMemo, useEffect } from "react";
import { Form } from "./components/Forms";
import { Header } from "./components/Header";
import { TodosList } from "./components/TodosList";
import { v4 as uuidV4 } from "uuid";

export const App = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialState);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [editedTodo, setEditedTodo] = useState(null);

  const filteredTodos = useMemo(() => {
    switch (selectedFilter) {
      case "all":
        return todos;

      case "completed":
        return todos.filter((item) => item.completed);

      case "incompleted":
        return todos.filter((item) => !item.completed);
    }
  }, [selectedFilter, todos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [filteredTodos]);

  const onComplete = (todo) => {
    const newTodos = todos.map((item) => {
      if (item.id === todo.id) {
        item.completed = !todo.completed;
      }

      return item;
    });

    setTodos(newTodos);
  };

  const onEdit = (todo) => {
    setEditedTodo(todo);
  };

  const onDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (title) => {
    const newTodo = {
      id: uuidV4(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const onChangeTitle = (newTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        todo = newTodo;
      }

      return todo;
    });

    setTodos(newTodos);
    setEditedTodo(null);
  };

  const onChangeSelect = (ev) => {
    const { value } = ev.target;
    setSelectedFilter(value);
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <Header />

        <Form
          todo={editedTodo}
          onAddTodo={addTodo}
          onChangeTitle={onChangeTitle}
          onChangeSelect={onChangeSelect}
        />

        <TodosList
          todos={filteredTodos}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeTitle={onChangeTitle}
          onAddTodo={addTodo}
        />
      </div>
    </div>
  );
};
