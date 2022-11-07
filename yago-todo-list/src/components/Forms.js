import React from "react";
import {v4 as uuidV4} from "uuid"

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {
    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? {title, id, completed} : todo
        )
        setTodos(newTodo);
        setEditTodo("");
    };

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!editTodo) {
            setTodos([...todos, {id: uuidV4(), title: input, completed: false}]);
            setInput("");
        } else {
            updateTodo(input, editTodo.id, editTodo.completed);
        }
    }
    return (
        <form onSubmit={onFormSubmit}>
            <input 
              type="text" 
              placeholder="O que você precisa fazer?..." 
              className="task-input" 
              value={input}
              required
              onChange={onInputChange}
            />
            <button className="button-add" type="submit">
                Adicionar
            </button>
        </form>
    )
}

export default Form;