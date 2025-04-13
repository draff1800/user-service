import { Document, Model, Schema, Types, model } from 'mongoose';
import type { SerialisedUser } from '../../types/auth.js';

interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  createdDateTime: Date;
  updatedDateTime: Date;
}

interface UserMethods {
  serialise(): SerialisedUser;
}

type UserModel = Model<UserDocument, object, UserMethods>;

const userSchema: Schema = new Schema<UserDocument, UserModel, UserMethods>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'createdDateTime', updatedAt: 'updatedDateTime' },
  },
);
userSchema.method('serialise', function serialise(this: UserDocument): SerialisedUser {
  return {
    username: this.username,
    email: this.email,
    createdDateTime: this.createdDateTime,
    updatedDateTime: this.updatedDateTime,
  };
});

export const User = model<UserDocument, UserModel>('User', userSchema);
