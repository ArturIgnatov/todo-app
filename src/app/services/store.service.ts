import { Injectable } from '@angular/core';
import { ApiService } from "./api-service/api.service";
import { BehaviorSubject, delay } from "rxjs";
import { CreateCategoryDto, UpdateCategoryDto } from "./api-service/interfaces";
import { ICategory } from "../models/category";
import { GqlService } from "./gql/gql.service";
import { MAIN_CATEGORIES } from "./gql/queries";
import {
  CREATE_CATEGORY,
  CREATE_TODO,
  REMOVE_CATEGORY,
  REMOVE_TODO,
  UPDATE_CATEGORY,
  UPDATE_TODO
} from "./gql/mutations";
import { CategoriesQuery, CategoriesQueryVariables } from "./gql/queries-generated-types";
import {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  CreateTodoMutation,
  CreateTodoMutationVariables,
  RemoveCategoryMutation,
  RemoveCategoryMutationVariables,
  RemoveTodoMutation,
  RemoveTodoMutationVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  UpdateTodoMutation,
  UpdateTodoMutationVariables
} from "./gql/mutations-generated-types";
import {WssService} from "./wss/wss.service";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public categories$ = new BehaviorSubject<Map<string, ICategory>>(new Map())
  public isLoading$ = new BehaviorSubject(false);

  constructor(
    private readonly apiService: ApiService,
    private readonly gqlService: GqlService,
    public readonly wss: WssService,
  ) {
    wss.on$('createTodo').subscribe(data => {
      const { forUpdate, notify } = this.useStore()
      const category = forUpdate.get(data.category_id);

      if (category) {
        forUpdate.set(category.id, {
          ...category,
          todos: [data, ...category.todos]
        })

        notify()
      }
    })
  }

  public useStore() {
    const forUpdate = new Map(this.categories$.value);

    const notify = () => {
      this.categories$.next(forUpdate)
    }

    return { forUpdate, notify }
  }

  public loadCategories() {
    this.isLoading$.next(true)

    this.gqlService.req<CategoriesQuery, CategoriesQueryVariables>(MAIN_CATEGORIES).pipe(delay(1000)).subscribe((value) => {
      this.categories$.next(value.categories.reduce((acc, item) => {
        acc.set(item.id, item)
        return acc;
      }, new Map()))

      this.isLoading$.next(false)
    })
  }

  public createCategory(data: CreateCategoryDto) {
    this.gqlService.req<CreateCategoryMutation, CreateCategoryMutationVariables>(CREATE_CATEGORY, { input: data })
      .subscribe((data) => {
        const { forUpdate, notify } = this.useStore()

        forUpdate.set(data.createCategory.id, data.createCategory)

        notify()
    })
  }

  public updateCategory(id: string, data: UpdateCategoryDto) {
    this.gqlService.req<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UPDATE_CATEGORY, { input: { id, name: data.name } })
      .subscribe(data => {
        const { forUpdate, notify } = this.useStore()
        const category = forUpdate.get(id);

        if (category) {
          forUpdate.set(data.updateCategory.id, {
            ...category,
            name: data.updateCategory.name
          })

          notify()
        }
    })
  }

  public removeCategory(id: string) {
    this.gqlService.req<RemoveCategoryMutation, RemoveCategoryMutationVariables>(REMOVE_CATEGORY, { id })
      .subscribe((data) => {
        const { forUpdate, notify } = this.useStore()

        forUpdate.delete(data.removeCategory.id)

        notify()
    })
  }

  public createTodo(categoryId: string, title: string ) {
    this.gqlService.req<CreateTodoMutation, CreateTodoMutationVariables>(CREATE_TODO, { input: { title, category_id: categoryId } })
      .subscribe((data) => {
        const { forUpdate, notify } = this.useStore()
        const category = forUpdate.get(data.createTodo.category_id);

        if (category) {
          forUpdate.set(category.id, {
            ...category,
            todos: [data.createTodo, ...category.todos]
          })

          notify()
        }
      })
  }

  public updateTodo(data: UpdateTodoMutationVariables['input']) {
    this.gqlService.req<UpdateTodoMutation, UpdateTodoMutationVariables>(UPDATE_TODO, { input: data })
    .subscribe(value => {
      const { forUpdate, notify } = this.useStore();
      const category = forUpdate.get(value.updateTodo.category_id);

      if (category) {
        forUpdate.set(category.id, {
          ...category,
          todos: category.todos.map(el => el.id === value.updateTodo.id ? value.updateTodo : el)
        })

        notify()
      }
    })
  }

  public removeTodo(id: string, categoryId:string) {
    this.gqlService.req<RemoveTodoMutation, RemoveTodoMutationVariables>(REMOVE_TODO,{ id })
      .subscribe((data) => {
        const { forUpdate, notify } = this.useStore();
        const category = forUpdate.get(categoryId);

        if (category) {
          forUpdate.set(categoryId, {
            ...category,
            todos: category.todos.filter(el => el.id !== data.removeTodo.id)
          })

          notify()
        }
      })
  }
}
