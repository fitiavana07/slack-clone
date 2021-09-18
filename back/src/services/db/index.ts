import { Connection, createConnection } from 'mongoose'

export const createDBConnection = (uri: string): Connection =>
  createConnection(uri)
