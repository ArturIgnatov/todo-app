import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {ApiService} from "../../services/api-service/api.service";
import {Router} from "@angular/router";
import {catchError, retry, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public loginFormControl = new FormControl('', [
    Validators.required, Validators.minLength(3)
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required, Validators.minLength(6)
  ]);

  constructor(
    private readonly authService: AuthService,
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  public signIn() {
    this.apiService.signIn({
      login: this.loginFormControl.value,
      password: this.passwordFormControl.value
    }).pipe(retry({ count: 2, delay: 1000 }), catchError(this.errorHandler.bind(this))).subscribe(async data => {
      this.authService.setJWT(data.access_token)
      this.router.navigate(['main'])
    })
  }

  public errorHandler(error: HttpErrorResponse) {
    this.snackBar.open(error.error.message, 'close', {
      panelClass: 'error',
      duration: 2000,
    })

    return throwError(() => error.message)
  }
}
