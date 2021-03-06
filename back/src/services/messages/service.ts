import { ApolloError } from 'apollo-server-core'
import { Types } from 'mongoose'
import Context from '../../context'
import { MessageDestinationType } from '../../generated/graphql'
import { UnauthenticatedError, UserService } from '../user'
import { UserDoc } from '../user/doc'
import { ChannelDoc, ChannelModel } from './channels'
import { MessageDoc } from './doc'
import { MessageModel } from './model'
import { TOPIC_NEW_CHANNEL_MESSAGE, TOPIC_NEW_DM } from './pubsub'

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
    const message = await new this.messageModel({
      content: args.messageContent,
      authorID: context.userID,
      destType: MessageDestinationType.DirectMessage,
      destID: args.destID,
    }).save()
    context.pubsub.publish(TOPIC_NEW_DM, {
      newDM: {
        ...message.toObject(),
        authorID: message.authorID,
        id: message.id,
      },
    })
    return message
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

  async sendChannelMessage(
    destID: Types.ObjectId,
    messageContent: string,
    context: Context,
  ): Promise<MessageDoc> {
    if (!context.userID) {
      throw new UnauthenticatedError()
    }

    const message = await new this.messageModel({
      content: messageContent,
      authorID: context.userID,
      destType: MessageDestinationType.ChannelMessage,
      destID: destID,
    }).save()

    context.pubsub.publish(TOPIC_NEW_CHANNEL_MESSAGE, {
      newChannelMessage: {
        ...message.toObject(),
        authorID: message.authorID,
        id: message.id,
      },
    })

    return message
  }

  async findChannelMessages(
    channel: ChannelDoc,
    context: Context,
  ): Promise<MessageDoc[]> {
    // TODO here: for private channel, only allow members to see messages.
    return this.messageModel.find({
      destType: MessageDestinationType.ChannelMessage,
      destID: channel._id,
    })
  }
}
