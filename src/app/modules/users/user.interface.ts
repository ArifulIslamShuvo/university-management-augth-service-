import { Model } from 'mongoose'

export type IUser = {
  id: string
  role: string
  Password: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
