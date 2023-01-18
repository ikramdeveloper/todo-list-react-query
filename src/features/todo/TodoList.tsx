import { ReactNode, useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../helpers/StrictModeDroppable";
import { getTodoQuery, updateTodoMutation } from "../../query/todoQuery";
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

  const [todoData, setTodoData] = useState(todos || []);

  useEffect(() => {
    const arrayIdsOrders = JSON.parse(
      localStorage.getItem("todoOrder") ?? "{}"
    );

    if (!arrayIdsOrders && todos?.length) {
      const todoIds = todos.map((todo) => todo.id);
      localStorage.setItem("todoOrder", JSON.stringify(todoIds));
    }

    let myArr;
    if (arrayIdsOrders?.length && todos?.length) {
      myArr = arrayIdsOrders.map((id: number) => {
        return todos.find((todo) => todo.id === id);
      });

      const newItems = todos.filter((el) => !arrayIdsOrders.includes(el.id));

      if (newItems?.length) myArr = [...newItems, ...myArr];
    }
    setTodoData(myArr || todos);
  }, [todos]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const tasks = [...todoData];
    const [reOrderedItem] = tasks.splice(result.source.index, 1);

    tasks.splice(result.destination.index, 0, reOrderedItem);

    const arrayIdsOrder = tasks.map((item) => item.id);
    localStorage.setItem("todoOrder", JSON.stringify(arrayIdsOrder));

    setTodoData(tasks);
  };

  let content = "" as ReactNode;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error: {error.message}</p>;
  } else {
    content = (
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="todos">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((todo, index) => (
                <TodoExcerpt key={todo.id} todo={todo} index={index} />
              ))}
              {provided.placeholder}
            </section>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    );
  }
  return (
    <div>
      <AddTodo />
      {content}
    </div>
  );
};
export default TodoList;
