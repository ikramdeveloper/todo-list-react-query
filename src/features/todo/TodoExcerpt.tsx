import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ITodo } from "../../types/todo";
import { updateTodoMutation, deleteTodoMutation } from "../../query/todoQuery";
import { Draggable } from "react-beautiful-dnd";

interface ITodoExcerpt {
  todo: ITodo;
  index: number;
}
const TodoExcerpt = ({ todo, index }: ITodoExcerpt) => {
  const updateMutation = updateTodoMutation();
  const deleteMutation = deleteTodoMutation();

  const handleDelete = (id: number) => {
    const arrayIdsOrder = JSON.parse(localStorage.getItem("todoOrder") ?? "{}");

    if (arrayIdsOrder?.length) {
      const updatedIdsOrder = arrayIdsOrder.filter(
        (item: number) => item !== id
      );
      localStorage.setItem("todoOrder", JSON.stringify(updatedIdsOrder));
    }

    deleteMutation.mutate({ id: todo.id });
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <article
          key={todo.id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
          <button className="trash" onClick={() => handleDelete(todo.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      )}
    </Draggable>
  );
};
export default TodoExcerpt;
