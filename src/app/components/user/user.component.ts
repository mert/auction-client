import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  @Input()
  user: any

  @Output()
  bid: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
