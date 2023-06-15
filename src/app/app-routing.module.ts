import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { AuthPageComponent } from "./pages/auth-page/auth-page.component";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth/auth.service";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivateChild: [() => inject(AuthService).canOpenMain()],
    children: [
      { path: 'main', component: MainPageComponent, }
    ]
  },
  {
    path: 'auth',
    canActivate: [() => inject(AuthService).canOpenAuth()],
    component: AuthPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
