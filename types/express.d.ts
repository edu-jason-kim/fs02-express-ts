import Express from 'express'
import { User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      User?: User
      userId: string
    }
  }
}
