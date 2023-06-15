export interface CreateTodoDto {
  category_id: string;
  title: string;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

export interface DeleteTodoDto {
  id: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export interface DeleteCategoryDto {
  id: string;
}
