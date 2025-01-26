import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'createdDateTime', updatedAt: 'updatedDateTime' },
  },
);

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
