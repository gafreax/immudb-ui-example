import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginAsync } from 'fastify'

import type { Accounting } from './types.d.ts'
import getClient from '../lib/client'
import { addSchema } from '../schema/accounting'

const add: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post('/add', { schema: addSchema }, async (request: FastifyRequest<{ Body: Accounting }>, reply: FastifyReply) => {
    const { body } = request
    const { accountingType, address, amount, iban, name } = body
    server.log.info('add ', body)
    const client = await getClient()
    await client?.setValEntries({
      kvms: [
        { key: Buffer.from('address', 'utf8'), val: Buffer.from(address.toString(), 'utf8') },
        { key: Buffer.from('amount', 'utf8'), val: Buffer.from(amount.toString(), 'utf8') },
        { key: Buffer.from('iban', 'utf8'), val: Buffer.from(iban.toString(), 'utf8') },
        { key: Buffer.from('name', 'utf8'), val: Buffer.from(name.toString(), 'utf8') },
        { key: Buffer.from('type', 'utf8'), val: Buffer.from(accountingType.toString(), 'utf8') }
      ]
    })
    await client?.close()
    await reply.send()
    server.log.info('added ')
  })
}
export default add
