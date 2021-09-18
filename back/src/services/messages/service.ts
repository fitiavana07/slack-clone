import { ApolloError } from 'apollo-server-core'
import { Types } from 'mongoose'
import Context from '../../context'
import { MessageDestinationType } from '../../generated/graphql'
import { UnauthenticatedError, UserService } from '../user'
import { UserDoc } from '../user/doc'
import { ChannelDoc, ChannelModel } from './channels'
import { MessageDoc } from './doc'
import { MessageModel } from './model'

export default class MessageService {
  private messageModel: MessageModel
  private userService: UserService
  private channelModel: ChannelModel
  constructor(
    messageModel: MessageModel,
    userService: UserService,
    channelModel: ChannelModel,
  ) {
    this.messageModel = messageModel
    this.userService = userService
    this.channelModel = channelModel
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
      destID: args.destID,
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

  async findMyDMs(
    destID: Types.ObjectId,
    context: Context,
  ): Promise<MessageDoc[]> {
    if (!context.userID) {
      throw new UnauthenticatedError()
    }
    const userID = context.userID
    return this.messageModel.find({
      destType: MessageDestinationType.DirectMessage,
      $or: [
        {
          authorID: userID,
          destID: destID,
        },
        {
          authorID: destID,
          destID: userID,
        },
      ],
    })
  }

  async addChannel(name: string, context: Context): Promise<ChannelDoc> {
    if (!context.userID) {
      throw new UnauthenticatedError()
    }
    return await new this.channelModel({
      name,
      creatorID: context.userID,
    }).save()
  }

  async findChannels(context: Context): Promise<ChannelDoc[]> {
    if (!context.userID) {
      throw new UnauthenticatedError()
    }
    return await this.channelModel.find()
  }

  async findChannel(
    id: Types.ObjectId,
    context: Context,
  ): Promise<ChannelDoc | null> {
    if (!context.userID) {
      throw new UnauthenticatedError()
    }
    return await this.channelModel.findById(id)
  }
}
