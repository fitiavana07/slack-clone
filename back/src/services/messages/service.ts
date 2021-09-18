import { ApolloError } from 'apollo-server-core'
import Context from '../../context'
import { MessageDestinationType } from '../../generated/graphql'
import { UnauthenticatedError, UserService } from '../user'
import { UserDoc } from '../user/doc'
import { MessageDoc } from './doc'
import { MessageModel } from './model'

export default class MessageService {
  private messageModel: MessageModel
  private userService: UserService
  constructor(messageModel: MessageModel, userService: UserService) {
    this.messageModel = messageModel
    this.userService = userService
  }

  // TODO currentUser afindra any am service ny authentification
  async sendDM(
    args: {
      destID: string
      messageContent: string
    },
    context: Context,
  ): Promise<MessageDoc> {
    if (!context.userID) {
      throw new UnauthenticatedError()
    }
    return await new this.messageModel({
      content: args.messageContent,
      authorID: context.userID,
      destType: MessageDestinationType.DirectMessage,
      destID: context.userID,
    }).save()
  }

  async getAuthor(msg: MessageDoc): Promise<UserDoc> {
    const author = await this.userService.findByID(msg.authorID)
    if (!author) {
      throw new ApolloError('Author not found', 'AUTHOR_NOT_FOUND')
    }
    return author
  }

  async getDestUser(msg: MessageDoc): Promise<UserDoc | null> {
    if (msg.destType == MessageDestinationType.DirectMessage) {
      return await this.userService.findByID(msg.destID)
    } else {
      return null
    }
  }
}
