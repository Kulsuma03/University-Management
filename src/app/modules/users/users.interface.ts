import { Model } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
}

// Create a new Model type that knows about IUserMethods...
export type UserModel = Model<IUser, Record<string, unknown>>
