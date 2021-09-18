import { MessageService } from './services/messages'
import { UserService } from './services/user'
type Context = {
  userID?: string
  userService: UserService
  messageService: MessageService
}

export default Context
