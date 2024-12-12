import express, { RequestHandler } from 'express'
import axios from 'axios'
import multer from 'multer'

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

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
