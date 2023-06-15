import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { WssService } from "../wss/wss.service";
import { DialogEntity, MessageEntity } from "../gql/gql-schema";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public dialogs$ = new BehaviorSubject<DialogEntity[]>([])
  public messages$ = new BehaviorSubject<MessageEntity[]>([])
  public assistant_is_typing$ = new BehaviorSubject(false);

  constructor(public readonly wss: WssService) {
    wss.on$('clientConnected').subscribe(data => {
      this.dialogs$.next(data.dialogs)
    })

    wss.on$('enterDialog').subscribe(data => {
      this.messages$.next(data.messages)
    })

    wss.on$('newDialog').subscribe(data => {
      this.dialogs$.next([...this.dialogs$.value, data])
    })

    wss.on$('removeDialog').subscribe(data => {
      this.dialogs$.next(this.dialogs$.value.filter(el => el.id !== data.id))
    })

    wss.on$('newMessage').subscribe(data => {
      this.messages$.next([...this.messages$.value, data])
    })

    wss.on$('removeMessage').subscribe(data => {
      this.messages$.next(this.messages$.value.filter(el => el.id !== data.id))
    })

    wss.on$('setTyping').subscribe((value) => {
      this.assistant_is_typing$.next(value)
    })
  }
}
