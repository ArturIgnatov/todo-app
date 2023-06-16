import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from "../../../services/caht/chat.service";
import { FormControl } from "@angular/forms";
import { auditTime } from "rxjs";
import { DialogEntity, MessageEntity } from "../../../services/gql/gql-schema";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StoreService } from "../../../services/store.service";
import { KeyValue } from "@angular/common";
import { ICategory } from "../../../models/category";

@Component({
  selector: 'chat-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public message = new FormControl("")
  @ViewChild('scrollTarget') public scroll_target: ElementRef<HTMLDivElement>;
  @Input() public dialogId: DialogEntity['id']

  constructor(
    public readonly chatService: ChatService,
    public readonly snackBar: MatSnackBar,
    public readonly storeService: StoreService
  ) {
    this.chatService.wss.on$('newMessage').pipe(auditTime(100)).subscribe(() => {
      this.scrollToBottom('smooth');
    })
  }

  ngOnInit() {
    this.scrollToBottom()
  }

  public trackBy(_: any, value: MessageEntity) {
    return value.id
  }

  public trackByCategories(_any, data: KeyValue<string, ICategory>) {
    return data.key
  }

  public scrollToBottom(behavior: ScrollBehavior = 'auto') {
    setTimeout(() => {
      this.scroll_target.nativeElement.scrollIntoView({ behavior })
    }, 100)
  }

  public sendMessage() {
    this.chatService.wss.emit('newMessage', {
      dialog_id: this.dialogId,
      content: this.message.value
    })

    this.message.setValue('')
  }

  public removeMessage = (id: string) => {
    this.chatService.wss.emit('removeMessage', { id })
  }

  public copyMessage = () => {
    this.snackBar.open('Copied!', 'close', {
      duration: 2000,
    })
  }

  public saveInToDo(data: { category_id: string, message_id: string }) {
    this.storeService.wss.emit('createTodo', data)
  }
}
