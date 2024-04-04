import server from './config/server'
import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(
    `Server started on port http://localhost:${PORT}  type=${process.env.NODE_ENV}`,
  )
})