import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheckCircle, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"

const TodosList = ({ todos, setTodos }) => {

    const handleDelete = ({ id }) => {
        
    }
    return (
        <div>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}>
                    <input type="text" 
                    value={todo.title} 
                    className="list" 
                    onChange={(event) => event.preventDefault()} 
                    />
                    <div>
                    <button className="button-complete task-button">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                    <button className="button-edit task-button">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="button-delete task-button" onClick={() => handleDelete(todo)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                </li>
            ))}
        </div>
    );
};

export default TodosList;