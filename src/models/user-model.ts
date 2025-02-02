import { Model, Schema, model } from 'mongoose';

interface UserDocument {
  username: string;
  email: string;
  passwordHash: string;
}

interface UserMethods {
  serialize(): { username: string; email: string; createdDateTime: Date; updatedDateTime: Date };
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
userSchema.method('serialize', function serialize() {
  return {
    username: this.username,
    email: this.email,
    createdDateTime: this.createdDateTime,
    updatedDateTime: this.updatedDateTime,
  };
});

export const User = model<UserDocument, UserModel>('User', userSchema);
