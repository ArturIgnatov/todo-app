import gql from "graphql-tag";

export const TODO_FRAGMENT = gql`fragment Todo on TodoEntity {
  id
  title
  completed
  category_id
}`

export const CATEGORY_FRAGMENT = gql`fragment Category on CategoryEntity {
  id
  name
}`
