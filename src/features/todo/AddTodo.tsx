import React, { useState } from "react";
import { addTodoMutation } from "../../query/todoQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const mutation = addTodoMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todoToAdd = {
      todo: newTodo,
      userId: 5,
      completed: false,
    };

    mutation.mutate(todoToAdd);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
};
export default AddTodo;
