import {ITodo} from "./todo";

export interface ICategory {
  id: string;
  name: string;
  todos: ITodo[];
}
