import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from "../../services/caht/chat.service";
import { BehaviorSubject, filter } from "rxjs";
import { HeaderService } from "../../services/header.service";
import { DialogEntity } from "../../services/gql/gql-schema";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent, ModalComponentData } from "../modal/modal.component";

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
  ) {
  }

  public openDialog(dialog: DialogEntity) {
    this.chatService.wss.emit('enterDialog', { dialog_id: dialog.id })
    this.current_dialog$.next(dialog)
  }

  public closeDialog() {
    this.message.setValue('')
    this.current_dialog$.next(null)
    this.headerService.left_controls$.next(null)
    this.chatService.messages$.next([])
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
}
