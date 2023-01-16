import axios from "axios";
import { TODOS_URL } from "../constants";
import { ITodo } from "../types/todo";

const todoApi = axios.create({
  baseURL: TODOS_URL,
});

export const getTodo = async () => {
  const { data } = await todoApi.get("/");
  return data;
};

export const addTodo = async (todo: Partial<ITodo>) => {
  const { data } = await todoApi.post("/", todo);
  return data;
};

export const updateTodo = async (todo: ITodo) => {
  const { data } = await todoApi.put(`/${todo.id}`, todo);
  return data;
};

export const deleteTodo = async ({ id }: { id: number }) => {
  const { data } = await todoApi.delete(`/${id}`);
  return data;
};
