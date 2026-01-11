import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { uploadImageRoute } from './routes/upload-image'
import { fastifyMultipart } from '@fastify/multipart'
import { env } from './env'

const server = fastify()

server.register(fastifyCors, {
  origin: env.FRONTEND_URL || 'http://localhost:5173',
})

server.register(fastifyMultipart)
server.register(uploadImageRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})