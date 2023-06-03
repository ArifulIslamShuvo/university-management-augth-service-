import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId()
  user.id = id

  // default password
  if (!user.Password) {
    user.Password = config.default_user_pass as string
  }
  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user!')
  }
  return createdUser
}

export default {
  createUser,
}
