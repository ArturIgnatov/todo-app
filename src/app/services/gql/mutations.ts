import gql from "graphql-tag";
import {CATEGORY_FRAGMENT, TODO_FRAGMENT} from "./fragments";

export const CREATE_CATEGORY = gql`
  ${CATEGORY_FRAGMENT}
  ${TODO_FRAGMENT}

  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ...Category
      todos {
        ...Todo
      }
    }
}`

export const UPDATE_CATEGORY = gql`
  ${CATEGORY_FRAGMENT}

  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      ...Category
    }
}`

export const REMOVE_CATEGORY = gql`mutation RemoveCategory($id: ID!) {
  removeCategory(id: $id) {
    id
  }
}`



export const CREATE_TODO = gql`
  ${TODO_FRAGMENT}

  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      ...Todo
    }
}`

export const UPDATE_TODO = gql`
  ${TODO_FRAGMENT}

  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      ...Todo
    }
}`

export const REMOVE_TODO = gql`mutation RemoveTodo($id: ID!) {
  removeTodo(id: $id) {
    id
  }
}`
