import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from "../../services/caht/chat.service";
import { auditTime, BehaviorSubject, filter } from "rxjs";
import { HeaderService } from "../../services/header.service";
import { DialogEntity, MessageEntity} from "../../services/gql/gql-schema";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent, ModalComponentData } from "../modal/modal.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StoreService } from "../../services/store.service";
import { KeyValue } from "@angular/common";
import { ICategory } from "../../models/category";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  public message = new FormControl("")
  public current_dialog$ = new BehaviorSubject<DialogEntity | null>(null)
  @ViewChild('scrollTarget') public scroll_target: ElementRef<HTMLDivElement>;

  constructor(
    public readonly chatService: ChatService,
    public readonly headerService: HeaderService,
    public readonly dialog: MatDialog,
    public readonly storeService: StoreService,
    public readonly snackBar: MatSnackBar
  ) {
    this.chatService.wss.on$('newMessage').pipe(auditTime(100)).subscribe(() => {
      this.scrollToBottom('smooth');
    })
  }

  public trackByMessages(_: any, value: MessageEntity) {
    return value.id
  }

  public trackByCategories(_any, data: KeyValue<string, ICategory>) {
    return data.key
  }

  public trackByDialog(_: any, value: DialogEntity) {
    return value.id
  }

  public scrollToBottom(behavior: ScrollBehavior = 'auto') {
    setTimeout(() => {
      this.scroll_target.nativeElement.scrollIntoView({ behavior })
    }, 100)
  }

  public openDialog(dialog: DialogEntity) {
    this.chatService.wss.emit('enterDialog', { dialog_id: dialog.id })
    this.current_dialog$.next(dialog)
    this.scrollToBottom()
  }

  public closeDialog() {
    this.message.setValue('')
    this.current_dialog$.next(null)
    this.headerService.left_controls$.next(null)
    this.chatService.messages$.next([])
  }

  public sendMessage(dialog_id: string) {
    this.chatService.wss.emit('newMessage', { dialog_id, content: this.message.value })
    this.message.setValue('')
  }

  public createDialog() {
    const dialogRef = this.dialog.open<ModalComponent, ModalComponentData>(ModalComponent, {
      data: {
        title: 'Create dialog',
        description: 'Fore create dialog please enter name',
        value: '',
        buttonText: 'Create'
      }
    })

    dialogRef.afterClosed().pipe(filter((value) => value?.length)).subscribe(name => {
      this.chatService.wss.emit('newDialog', { name })
    })
  }

  public removeDialog(event: Event, id: string) {
    event.stopPropagation();
    this.chatService.wss.emit('removeDialog', { id })
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
