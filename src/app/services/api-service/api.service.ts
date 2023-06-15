import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CreateCategoryDto, CreateTodoDto, UpdateCategoryDto, UpdateTodoDto } from "./interfaces";
import { ICategory } from "../../models/category";
import { ITodo } from "../../models/todo";
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base_url = environment.API_BASE_DOMAIN;

  constructor(private http: HttpClient) {}

  /**
   * AUTH
   * ________________________________________________________________
   */

  public signIn(data: { login: string; password: string }) {
    return this.http.post<{ access_token: string }>(this.base_url + '/auth/sign-in', data)
  }

  public signUp(data: { login: string; password: string }) {
    return this.http.post<{ access_token: string }>(this.base_url + '/auth/sign-up', data)
  }

  /**
   * CATEGORIES
   * ________________________________________________________________
   */
  public getCategories() {
    return this.http.get<ICategory[]>(this.base_url + '/category').pipe(take(1))
  }

  public getCategory(id: string) {
    return this.http.get<ICategory>(this.base_url + `/category/${id}`).pipe(take(1))
  }

  public createCategory(data: CreateCategoryDto) {
    return this.http.post<ICategory>(this.base_url + '/category', data).pipe(take(1))
  }

  public updateCategory(id: string, data: UpdateCategoryDto) {
    return this.http.patch<ICategory>(this.base_url+ `/category/${id}`, data).pipe(take(1))
  }

  public removeCategory(id: string) {
    return this.http.delete<{ id: string }>(this.base_url+ `/category/${id}`).pipe(take(1))
  }

  /**
   * TODOS
   * ________________________________________________________________
   */
  public getTodos() {
    return this.http.get<ITodo[]>(this.base_url + '/todo').pipe(take(1))
  }

  public getTodo(id: string) {
    return this.http.get<ITodo>(this.base_url + `/todo/${id}`).pipe(take(1))
  }

  public createTodo(data: CreateTodoDto) {
    return this.http.post<ITodo>(this.base_url + '/todo', data).pipe(take(1))
  }

  public updateTodo(id: string, data: UpdateTodoDto) {
    return this.http.patch<ITodo>(this.base_url +`/todo/${id}`, data).pipe(take(1))
  }

  public removeTodo(id: string) {
   return this.http.delete<{ id: string }>(this.base_url + `/todo/${id}`).pipe(take(1))
  }
}
