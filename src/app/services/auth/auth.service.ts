import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _jwt$ = new BehaviorSubject('')
  constructor(public readonly  router: Router) {
    const storeJWT = localStorage.getItem('@JWT')

    if (storeJWT) {
      this.setJWT(storeJWT)
    }
  }

  public canOpenMain() {
    if (!this.jwt) {
      this.router.navigate(['auth'])
      return false;
    }

    return true
  }

  public canOpenAuth() {
    if (this.jwt) {
      this.router.navigate(['main'])
      return false;
    }

    return true
  }

  public get jwt$() {
    return this._jwt$
  }

  public get jwt() {
    return this._jwt$.value
  }

  public get decodedJWT() {
    return jwtDecode<{ id: string }>(this._jwt$.value)
  }

  public setJWT(token: string) {
    localStorage.setItem('@JWT', token)
    this._jwt$.next(token)
  }

  public removeJWT() {
    localStorage.removeItem('@JWT')
    this._jwt$.next('')
  }
}
