import {
  faCheckCircle,
  faEdit,
  faCheckSquare,
  faSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export const TodoItem = ({ todo, onComplete, onEdit, onDelete }) => {
  return (
    <li className="list-item" key={todo.id}>
      <p className={`list ${todo.completed ? "complete" : ""}`}>{todo.title}</p>

      <div>
        <button
          className="button-edit task-button"
          onClick={() => onEdit(todo)}
        >
          <Icon icon={faEdit} />
        </button>

        <button
          className="button-delete task-button"
          onClick={() => onDelete(todo)}
        >
          <Icon icon={faTrashAlt} />
        </button>

        <button
          className="button-complete task-button"
          onClick={() => onComplete(todo)}
        >
          <Icon icon={todo.completed ? faSquare : faCheckSquare} />
        </button>
      </div>
    </li>
  );
};
