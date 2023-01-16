import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ITodo } from "../../types/todo";
import { updateTodoMutation, deleteTodoMutation } from "../../query/todoQuery";

interface ITodoExcerpt {
  todo: ITodo;
}
const TodoExcerpt = ({ todo }: ITodoExcerpt) => {
  const updateMutation = updateTodoMutation();
  const deleteMutation = deleteTodoMutation();

  return (
    <article key={todo.id}>
      <div className="todo">
        <input
          type="checkbox"
          checked={todo.completed}
          id={String(todo.id)}
          onChange={() =>
            updateMutation.mutate({ ...todo, completed: !todo.completed })
          }
        />
        <label htmlFor={String(todo.id)}>{todo.todo}</label>
      </div>
      <button
        className="trash"
        onClick={() => deleteMutation.mutate({ id: todo.id })}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  );
};
export default TodoExcerpt;
