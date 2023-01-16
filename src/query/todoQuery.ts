import { useQuery, useMutation, useQueryClient } from "react-query";
import { addTodo, deleteTodo, getTodo, updateTodo } from "../api/todosApi";
import { ITodo } from "../types/todo";

const getTodoQuery = () => {
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery("todos", getTodo, {
    select: (data) => data.sort((a: ITodo, b: ITodo) => b.id - a.id),
  });
  return { isLoading, isError, error, todos };
};

const addTodoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  return mutation;
};

const updateTodoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  return mutation;
};

const deleteTodoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  return mutation;
};

export {
  getTodoQuery,
  addTodoMutation,
  updateTodoMutation,
  deleteTodoMutation,
};
