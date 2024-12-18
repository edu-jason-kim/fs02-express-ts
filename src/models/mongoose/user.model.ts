import { model, Schema } from "mongoose";
import { User } from "../../types/user";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
})

export const UserModel = model<User>('User', userSchema)
