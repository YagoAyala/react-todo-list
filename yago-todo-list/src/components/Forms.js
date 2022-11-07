import React from "react";

const Form = () => {
    return (
        <form>
            <input type="text" placeholder="O que você precisa fazer?..." className="task-input"/>
            <button className="button-add" type="submit">
                Adicionar
            </button>
        </form>
    )
}

export default Form;