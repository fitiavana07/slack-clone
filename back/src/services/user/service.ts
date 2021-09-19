import { UserModel } from './model'
import bcrypt from 'bcrypt'
import { UserDoc } from './doc'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-core'
import { JWTPayload } from './jwt'
import Context from '../../context'
import { Types } from 'mongoose'

export default class UserService {
  private userModel: UserModel
  private jwtExpDelta: number
  private jwtSecretKey: string

  constructor(
    userModel: UserModel,
    jwtSecretKey: string,
    jwtExpDelta: number,
  ) {
    this.userModel = userModel
    this.jwtSecretKey = jwtSecretKey
    this.jwtExpDelta = jwtExpDelta
  }

  /**
   * it returns an access token after creating the user.
   */
  async signupAndLogin(
    args: Pick<UserDoc, 'email' | 'fullName' | 'password' | 'username'>,
  ): Promise<string> {
    if (await this._findByEmail(args.email)) {
      throw new ApolloError('Email already used', 'EMAIL_ALREADY_USED')
    }
    if (await this._findByUsername(args.username)) {
      throw new ApolloError('Username already used', 'USERNAME_ALREADY_USED')
    }

    const hashedPassword = await bcrypt.hash(args.password, 10)
    const user = await new this.userModel({
      ...args,
      password: hashedPassword,
    }).save()
    return this.createJWT(user)
  }

  async login(args: Pick<UserDoc, 'email' | 'password'>): Promise<string> {
    const user = await this._findByEmail(args.email)
    if (!user) {
      throw new ApolloError('User not found', 'USER_NOT_FOUND')
    }
    if (!(await bcrypt.compare(args.password, user.password))) {
      throw new ApolloError('Wrong Password', 'WRONG_PASSWORD')
    }
    return this.createJWT(user)
  }

  private createJWT(user: UserDoc) {
    return jwt.sign(
      {
        email: user.email,
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + this.jwtExpDelta,
      },
      this.jwtSecretKey,
    )
  }

  async parseJWT(accessToken: string): Promise<JWTPayload> {
    return jwt.verify(accessToken, this.jwtSecretKey) as JWTPayload
  }

  async _findByEmail(email: string): Promise<UserDoc | null> {
    return await this.userModel.findOne({ email })
  }

  async _findByUsername(username: string): Promise<UserDoc | null> {
    return await this.userModel.findOne({ username })
  }

  async findByID(id: Types.ObjectId): Promise<UserDoc | null> {
    return await this.userModel.findById(id)
  }

  async findUsers(): Promise<UserDoc[]> {
    return await this.userModel.find()
  }

  async getMe(context: Context): Promise<UserDoc | null> {
    if (!context.userID) {
      return null
    }
    return await this.findByID(context.userID)
  }
}
