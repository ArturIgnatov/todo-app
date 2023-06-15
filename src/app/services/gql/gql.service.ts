import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DocumentNode } from "graphql/language";
import { environment } from "../../../environments/environment";
import { map, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GqlService {
  constructor(private readonly  http: HttpClient) {}

  public req<R, V = Record<string, any>>(query: DocumentNode, variables?: V) {
    return this.http.post<{ data: R }>(environment.API_BASE_DOMAIN + '/graphql', {
      query: query.loc.source.body,
      variables,
    }).pipe(take(1), map((value) => value.data))
  }
}
