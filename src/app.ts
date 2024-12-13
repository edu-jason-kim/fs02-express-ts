import express, { RequestHandler } from 'express'
import axios from 'axios'
import multer from 'multer'
import { MongooseUserRepository } from './repositories/mongoose/user.repository'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { PrismaUserRepository } from './repositories/prisma/user.repository'

const app = express()
const upload = multer({ dest: 'uploads/' })

const handler: RequestHandler = async (req, res, next) => {
  const response = await axios.get('https://learn.codeit.kr/api/codeitmall/products')
  res.json(response.data)
}

const middleware: RequestHandler = async (req, res, next) => {
  // 인증로직
  req.userId = '123'
  next()
}

app.use(middleware)

app.get('/products', handler)

app.get('/', (req, res) => {
  const userId = req.userId
  res.send(userId)
})

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send()
})


// Hexagonal Architecture
// repository: db에 접근하는 인터페이스
const mongooseUserRepository = new MongooseUserRepository()
const prismaUserRepository = new PrismaUserRepository()

// service: 비지니스 로직이 작성된 곳
const userService = new UserService(prismaUserRepository)

// controller: endpoint를 매핑해서 service를 연결해주는 곳
const userController = new UserController(userService)

app.post('/users', userController.create)
app.get('/users/:id', userController.getUserById)
app.get('/users', userController.getAllUsers)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
