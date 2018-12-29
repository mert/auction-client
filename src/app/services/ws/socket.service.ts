import { Injectable } from '@angular/core'
import * as socketIo from 'socket.io-client'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Message } from 'src/app/messages/msg'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any

  public sync() {
    return new Observable((observer) => {
        this.socket = socketIo(environment._ws, {
          path: '/auction',
          forceNew: true,
          transports: ['websocket'],
        })
        this.socket.on('connect', () => {
          observer.next(this.socket)
        })
        this.socket.on('error', (e) => {
          observer.error()
        })
    })
  }

  public send(message: Message<any>) {
    console.log('-send', message)
    this.socket.emit('message', message)
  }

  public get() {
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(Message.From(data))
      })
    })
  }
}
