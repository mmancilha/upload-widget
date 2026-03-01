import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { uploadImageRoute } from './routes/upload-image'
import { fastifyMultipart } from '@fastify/multipart'
import { env } from './env'

const server = fastify()

const allowedOrigins = [
  env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean) as string[]

server.register(fastifyCors, {
  origin: allowedOrigins,
})

server.register(fastifyMultipart)
server.register(uploadImageRoute)

const port = Number(process.env.PORT) || 3333
server.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})