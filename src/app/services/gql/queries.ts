import gql from "graphql-tag";
import {CATEGORY_FRAGMENT, TODO_FRAGMENT} from "./fragments";

export const MAIN_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  ${TODO_FRAGMENT}

  query Categories {
    categories {
      ...Category
      todos {
        ...Todo
      }
    }
}`
