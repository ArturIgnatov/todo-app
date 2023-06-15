import * as Types from './gql-schema';

export type CategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { categories: Array<(
    Pick<Types.CategoryEntity, 'id' | 'name'>
    & { todos: Array<Pick<Types.TodoEntity, 'id' | 'title' | 'completed' | 'category_id'>> }
  )> };
