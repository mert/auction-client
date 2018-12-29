import { Component, OnInit } from '@angular/core'
import { SocketService } from './services/ws/socket.service'
import { Message } from './messages/msg'
import { MessageType } from './messages/msg-type'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    ':host { display:flex; flex-direction:column; height:100%; place-content:center space-around; padding:0 60px; }'
  ]
})
export class AppComponent implements OnInit {

  users: []
  auction: any

  constructor(private socketService: SocketService) {
  }

  async ngOnInit() {
    this.socketService.sync().subscribe((socket: any) => {
      console.log('connect')
    })

    this.socketService.get().subscribe((msg: Message<any>) => {
      console.log('receive', msg)
      switch (msg.type) {
        case MessageType.stc_sync_session:
          this.users = msg.content.users
          this.auction = msg.content.auction
        break
      }
    })
  }

  bid(user: any) {
    if (this.auction && user.amount && new Date() < new Date(this.auction.deadline)) {
      this.socketService.send(new Message(MessageType.cts_bid, {
        user,
        auction: this.auction,
        amount: user.amount,
      }))
    }
  }

  restore() {
    this.socketService.send(new Message(MessageType.cts_restore))
  }

}
