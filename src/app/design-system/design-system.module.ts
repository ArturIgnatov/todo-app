import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingIndicatorComponent } from "./typing-indicator/typing-indicator.component";
import { MessageComponent } from "./message/message.component";
import { AppToolbarComponent } from "./toolbar/app-toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MarkdownModule } from "ngx-markdown";



@NgModule({
  declarations: [
    AppToolbarComponent,
    MessageComponent,
    TypingIndicatorComponent,
  ],
  imports: [
    MatToolbarModule,
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MarkdownModule.forRoot(),
  ],
  exports: [
    AppToolbarComponent,
    MessageComponent,
    TypingIndicatorComponent,
  ]
})
export class DesignSystemModule { }
