/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangedAt: Date;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IStudent;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordmatched(
//     givenPassword: string,
//     savePassword: string
//   ): Promise<boolean>;
// };

// export type UserMode = Model<IUser, Record<string, unknown>>;
