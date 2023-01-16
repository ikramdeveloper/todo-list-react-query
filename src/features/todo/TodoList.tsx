import { ReactNode } from "react";
import { getTodoQuery } from "../../query/todoQuery";
import { ITodo } from "../../types/todo";
import TodoExcerpt from "./TodoExcerpt";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const { isLoading, isError, error, todos } = getTodoQuery() as {
    isLoading: boolean;
    isError: boolean;
    error: any;
    todos: ITodo[];
  };

  let content = "" as ReactNode;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error: {error.message}</p>;
  } else {
    content = todos.map((todo) => <TodoExcerpt key={todo.id} todo={todo} />);
  }
  return (
    <div>
      <AddTodo />
      {content}
    </div>
  );
};
export default TodoList;
