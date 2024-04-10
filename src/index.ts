import app from './driver/api'
import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(
    `Server started on port http://localhost:${PORT}  type=${process.env.NODE_ENV}`,
  )
})