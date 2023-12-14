import fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

import list from './routes/list'
import add from './routes/add'

const server = fastify({ logger: true })

server.register(cors)
server.register(swagger)

server.register(swaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
})


server.register(add)
server.register(list)

server.get('/healthcheck', async (_, reply) => {
  server.log.info({ healthcheck: 'ok' })
  await reply.send({ healthcheck: 'ok' })
})

server.get('/', async (_, reply) => {
  await reply.send("Up and running")
})

server.listen({ port: 8000 }, (err, _address) => {
  if (err != null) {
    server.log.error('Error:', err)
    process.exit(1)
  }
  server.log.info('started')
})
