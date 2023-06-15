import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ChatModule } from "./components/chat/chat.module";
import {AppTodoComponent} from "./components/todo/app-todo.component";
import {AppCategoryComponent} from "./components/category/app-category.component";
import {ChangeDetectionDirective} from "./directives/change-detection.directive";
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DesignSystemModule} from "./design-system/design-system.module";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    AppTodoComponent,
    AppCategoryComponent,
    ChangeDetectionDirective,
    AuthPageComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    ChatModule,
    DesignSystemModule,
    NgOptimizedImage,
  ],
  providers: [],
  exports: [
    AppTodoComponent,
    AppCategoryComponent,
    ChangeDetectionDirective,
    AuthPageComponent,
    MainPageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
