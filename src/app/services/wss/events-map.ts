import { DialogEntity, MessageEntity } from "../gql/gql-schema";
import { ITodo } from "../../models/todo";

export interface IListenEventMap {
  newDialog: (data: DialogEntity) => void;
  removeDialog: (data: { id: string }) => void;
  newMessage: (data: MessageEntity) => void;
  removeMessage: (data: { id: string }) => void;
  clientConnected: (data: { dialogs: DialogEntity[] }) => void;
  enterDialog: (data: { messages: MessageEntity[] }) => void;
  createTodo: (data: ITodo) => void;
  setTyping: (data: boolean) => void;
}

export interface IEmitEventMap {
  newDialog: (data: { name: string }) => void;
  removeDialog: (data: { id: string }) => void;
  newMessage: (data: { content: string; dialog_id: string }) => void;
  removeMessage: (data: { id: string }) => void;
  enterDialog: (data: { dialog_id: string }) => void;
  createTodo: (data: { category_id: string; message_id: string }) => void;
}

export type EventParams<R extends (...args: any) => any> = Parameters<R>;
