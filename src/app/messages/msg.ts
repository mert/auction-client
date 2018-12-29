import { MessageType } from './msg-type'

export class Message<T> {
    type: MessageType
    content: T

    static From(data: any): Message<any> {
      return Object.assign(new Message(data.type, data.content), data)
    }

    constructor(type: MessageType, content: T = null) {
        this.type = type
        this.content = content
    }
}
