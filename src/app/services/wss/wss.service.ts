import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { io, Socket } from 'socket.io-client'
import { environment } from "../../../environments/environment";
import { EventParams, IEmitEventMap, IListenEventMap } from "./events-map";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class WssService {
  private socket: Socket<IListenEventMap, IEmitEventMap> = io(environment.WSS_DOMAIN, { path: '/chat', auth: { token : "" },  transports: ['websocket'], autoConnect: false })
  public connected$ = new BehaviorSubject(false)

  constructor(private readonly authService: AuthService) {
    authService.jwt$.pipe(distinctUntilChanged()).subscribe((jwt) => {
      if (jwt) {
        this.connect(jwt)
      } else {
        this.disconnect()
      }
    })
  }

  private connect(token: string) {

    (this.socket.io.opts as any).auth.token = token

    this.socket.connect()


    this.socket.on('connect', () => {
    this.connected$.next(true)
    })

    this.socket.on('connect_error', err => {
      console.log('connect_error', err)
    })

    this.socket.on('disconnect', () => {
      this.connected$.next(false)
      console.log('disconnected')
    })

    return this.connected$
  }

  public disconnect() {
    this.socket.disconnect()
    this.socket.close()

    return this.connected$
  }

  public emit<E extends keyof IEmitEventMap>(event: E, ...args: EventParams<IEmitEventMap[E]>) {
    this.socket.emit(event, ...args)
  }

  public on$<E extends keyof IListenEventMap>(event: E) {
    return new Observable<EventParams<IListenEventMap[E]>[0]>((subscriber) => {
      const fn = (data: EventParams<IListenEventMap[E]>[0]) => subscriber.next(data)
      this.socket.on(event, fn as any)

      return () => this.socket.off(event, fn as any)
    })
  }
}
