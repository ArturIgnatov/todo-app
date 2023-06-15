import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { ReplaySubject } from "rxjs";
import { MessageEntity, MessageRole } from "../../services/gql/gql-schema";
import { BaseComponent } from "../../components/base.component";
import { StoreService } from "../../services/store.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent extends BaseComponent {
  public message$ = new ReplaySubject<MessageEntity>(1)
  protected readonly MessageRole = MessageRole;

  constructor(public readonly storeService: StoreService) {
    super(MessageComponent.name);
  }

  @Input() set message(value: MessageEntity) {
    this.message$.next(value)
  }
  @Output() onCopy = new EventEmitter<void>()
  @Output() onRemove = new EventEmitter<string>()

  public onCopyHandler() {
    this.onCopy.emit()
  }

  public onRemoveHandler(id: string) {
    this.onRemove.emit(id)
  }
}
