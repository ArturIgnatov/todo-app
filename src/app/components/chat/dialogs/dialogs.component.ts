import {Component, EventEmitter, Output} from '@angular/core';
import {ChatService} from "../../../services/caht/chat.service";
import {DialogEntity} from "../../../services/gql/gql-schema";

@Component({
  selector: 'chat-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent {
  @Output() openDialog = new EventEmitter<DialogEntity>()

  constructor(public chatService: ChatService) {}

  public trackBy(_: any, value: DialogEntity) {
    return value.id
  }

  public openDialogHandler(dialog: DialogEntity) {
    this.openDialog.emit(dialog);
  }

  public removeDialog(event: Event, id: string) {
    event.stopPropagation();

    this.chatService.wss.emit('removeDialog', { id })
  }
}
