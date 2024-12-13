import { Request, Response } from "express";
import { UserService } from "../services/user.service";

// API endpoint에서 호출이 되는 함수
// 비지니스 로직은 endpoint에 mapping
export class UserController {
  constructor (private userService: UserService) {}

  async create (req: Request, res: Response) {
    const user = await this.userService.createUser(req.body)
    res.status(201).json(user)
  }

  async getUserById (req: Request, res: Response) {
    const userId = req.params.id
    const user = await this.userService.getUserById(userId)

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'user not found' })
    }
  }

  async getAllUsers (req: Request, res: Response) {
    const users = await this.userService.getAllUsers()
    res.json(users)
  }
}
