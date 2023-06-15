import * as Types from './gql-schema';

export type CreateCategoryMutationVariables = Types.Exact<{
  input: Types.CreateCategoryInput;
}>;


export type CreateCategoryMutation = { createCategory: (
    Pick<Types.CategoryEntity, 'id' | 'name'>
    & { todos: Array<Pick<Types.TodoEntity, 'id' | 'title' | 'completed' | 'category_id'>> }
  ) };

export type UpdateCategoryMutationVariables = Types.Exact<{
  input: Types.UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { updateCategory: Pick<Types.CategoryEntity, 'id' | 'name'> };

export type RemoveCategoryMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RemoveCategoryMutation = { removeCategory: Pick<Types.RemoveCategoryPayload, 'id'> };

export type CreateTodoMutationVariables = Types.Exact<{
  input: Types.CreateTodoInput;
}>;


export type CreateTodoMutation = { createTodo: Pick<Types.TodoEntity, 'id' | 'title' | 'completed' | 'category_id'> };

export type UpdateTodoMutationVariables = Types.Exact<{
  input: Types.UpdateTodoInput;
}>;


export type UpdateTodoMutation = { updateTodo: Pick<Types.TodoEntity, 'id' | 'title' | 'completed' | 'category_id'> };

export type RemoveTodoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RemoveTodoMutation = { removeTodo: Pick<Types.RemoveTodoPayload, 'id'> };
