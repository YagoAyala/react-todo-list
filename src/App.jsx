import "./App.css";
import { useState, useMemo, useEffect } from "react";
import { Form } from "./components/Forms";
import { Header } from "./components/Header";
import { TodosList } from "./components/TodosList";
import { v4 as uuidV4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        if(item.completed){
          toast.success("Item Realizado!")
        } else {
          toast.success("Item Desfeito!")
        }
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
    toast.success("Item Deletado!")
  };

  const addTodo = (title) => {
    const newTodo = {
      id: uuidV4(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    toast.success("Item Adicionado!")
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
    toast.success("Item Atualizado!")
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
      <ToastContainer />
    </div>
  );
};
