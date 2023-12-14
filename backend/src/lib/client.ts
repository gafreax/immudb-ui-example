import { Client } from '@codenotary/immudb-node'
import { pino } from 'pino'
const logger = pino()

// todo: move secret into env
// todo: documenting the things
let client: Client | undefined

const getClient = async (): Promise<Client | undefined> => {
  logger.info('getClient')
  try {
    logger.info(client)
    if (client !== undefined) return client
    client = new Client({
      host: '127.0.0.1',
      port: 3322,
      user: 'immudb',
      password: 'immudb',
      database: 'defaultdb'
    })
    return client
  } catch (error) {
    logger.error('error in getClient')
    logger.error(error)
  }
}

export default getClient
