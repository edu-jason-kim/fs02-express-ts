import { UserModel } from "../../models/mongoose/user.model";
import { User } from "../../types/user";
import { IUserRepository } from "../user.repository.interface";

export class MongooseUserRepository implements IUserRepository {
  async create(data: Pick<User, "email" | "name">): Promise<User> {
      const user = new UserModel(data)
      await user.save()
      return user.toObject()
  }

  async findAll(): Promise<User[]> {
      const users = await UserModel.find()
      return users
  }

  async findById(id: string): Promise<User | null> {
      const user = await UserModel.findById(id)
      return user
  }
}
