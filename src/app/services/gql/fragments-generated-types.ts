import * as Types from './gql-schema';

export type TodoFragment = Pick<Types.TodoEntity, 'id' | 'title' | 'completed' | 'category_id'>;

export type CategoryFragment = Pick<Types.CategoryEntity, 'id' | 'name'>;
