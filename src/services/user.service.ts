import { IUserRepository } from "../repositories/user.repository.interface";
import { User } from "../types/user";

// service layer: 실제 비지니스 로직이 작성이 되는 곳
export class UserService {
  // IUserRepository를 구현하는 어떠한 respository가 와도 괜찮다.
  // 비지니스 로직의 영향이 없이 db가 바뀔 수 있는 구조
  constructor (private userRepository: IUserRepository) {}

  async createUser (data: Pick<User, 'email' | 'name'>): Promise<User> {
    return this.userRepository.create(data)
  }

  async getUserById (id: string): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async getAllUsers (): Promise<User[]> {
    return this.userRepository.findAll()
  }
}
