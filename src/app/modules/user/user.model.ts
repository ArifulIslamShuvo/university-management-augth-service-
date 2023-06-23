import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  );
};
UserSchema.methods.isPasswordmatched = async function (
  givenPassword: string,
  savePassword: string
): Promise<Partial<boolean>> {
  return await bcrypt.compare(givenPassword, savePassword);
};

//User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user passware
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_round)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
