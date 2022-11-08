import { useState } from "react";

const options = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Completos",
    value: "completed",
  },
  {
    label: "Incompletos",
    value: "incompleted",
  },
];

export const Form = ({ todo, onAddTodo, onChangeTitle, onChangeSelect }) => {
  const [title, setTitle] = useState(todo?.title || "");

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (todo) {
      onChangeTitle({ ...todo, title });
    } else {
      onAddTodo(title);
    }
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="task-input"
        onChange={(ev) => setTitle(ev.target.value)}
        placeholder={todo ? "Editar" : "O que você precisa fazer?..."}
        required
        type="text"
        value={title}
      />

      <button className="button-add" type="submit">
        {todo ? "Atualizar" : "Adicionar"}
      </button>
      <select className="select-filter" onChange={onChangeSelect}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
};
