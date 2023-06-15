import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from "./dialogs/dialogs.component";
import { MessagesComponent } from "./messages/messages.component";
import { ChatComponent } from "./chat.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { DesignSystemModule } from "../../design-system/design-system.module";



@NgModule({
  declarations: [
    DialogsComponent,
    MessagesComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule,
    DesignSystemModule,
  ],
  exports: [ChatComponent]
})
export class ChatModule { }
