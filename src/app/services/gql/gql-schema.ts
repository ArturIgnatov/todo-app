/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
}

export interface CategoryEntity {
  __typename?: 'CategoryEntity';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  todos: Array<TodoEntity>;
  updated_at: Scalars['DateTime']['output'];
}

export interface CreateCategoryInput {
  name: Scalars['String']['input'];
}

export interface CreateTodoInput {
  category_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}

export interface DialogEntity {
  __typename?: 'DialogEntity';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  user_id: Scalars['ID']['output'];
}

export interface MessageEntity {
  __typename?: 'MessageEntity';
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  dialog_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  role: MessageRole;
  updated_at: Scalars['DateTime']['output'];
}

/** Role for messages in dialog */
export enum MessageRole {
  /** GPT role */
  ASSISTANT = 'assistant',
  /** User role */
  USER = 'user'
}

export interface Mutation {
  __typename?: 'Mutation';
  createCategory: CategoryEntity;
  createTodo: TodoEntity;
  removeCategory: RemoveCategoryPayload;
  removeTodo: RemoveTodoPayload;
  updateCategory: CategoryEntity;
  updateTodo: TodoEntity;
}


export interface MutationCreateCategoryArgs {
  input: CreateCategoryInput;
}


export interface MutationCreateTodoArgs {
  input: CreateTodoInput;
}


export interface MutationRemoveCategoryArgs {
  id: Scalars['ID']['input'];
}


export interface MutationRemoveTodoArgs {
  id: Scalars['ID']['input'];
}


export interface MutationUpdateCategoryArgs {
  input: UpdateCategoryInput;
}


export interface MutationUpdateTodoArgs {
  input: UpdateTodoInput;
}

export interface Query {
  __typename?: 'Query';
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  message: MessageEntity;
  todo: TodoEntity;
  todos: Array<TodoEntity>;
  user: UserEntity;
  users: Array<UserEntity>;
}


export interface QueryCategoryArgs {
  id: Scalars['ID']['input'];
}


export interface QueryMessageArgs {
  id: Scalars['String']['input'];
}


export interface QueryTodoArgs {
  id: Scalars['ID']['input'];
}


export interface QueryUserArgs {
  id: Scalars['ID']['input'];
}

export interface RemoveCategoryPayload {
  __typename?: 'RemoveCategoryPayload';
  id: Scalars['ID']['output'];
}

export interface RemoveTodoPayload {
  __typename?: 'RemoveTodoPayload';
  id: Scalars['ID']['output'];
}

export interface TodoEntity {
  __typename?: 'TodoEntity';
  category: CategoryEntity;
  category_id: Scalars['String']['output'];
  completed: Scalars['Boolean']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
}

export interface UpdateCategoryInput {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}

export interface UpdateTodoInput {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
}

export interface UserEntity {
  __typename?: 'UserEntity';
  created_at: Scalars['DateTime']['output'];
  dialogs: Array<DialogEntity>;
  id: Scalars['ID']['output'];
  login: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
}
