import { PrismaClient } from "@prisma/client";
import { User } from "../../types/user";
import { IUserRepository } from "../user.repository.interface";

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  create(data: Pick<User, "email" | "name">): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id }})
  }
}
