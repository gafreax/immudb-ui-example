
import Long from 'long'
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'

import getClient from '../lib/client'
import type { Accounting, AccountingFields, IDData } from './types.d.ts'
import { AccountingType } from './enum'
import { listSchema } from '../schema/accounting'

type AddFieldToAccountingI = (key: Buffer, val: Buffer) => AccountingFields

// todo: unit test
const isAccountingData = (key: Buffer): boolean => {
  const keyString = key?.toString()
  return ['address', 'amount', 'iban', 'name', 'id', 'type'].includes(keyString)
}

const getAccountingType = (val: string): AccountingType => {
  return val === 'sending' ? AccountingType.sending : AccountingType.receiving
}

// todo: unit test
const addFieldToAccounting: AddFieldToAccountingI = (key, val) => {
  switch (key.toString()) {
    case 'address':
      return { address: val.toString() }
    case 'amount':
      return { amount: parseFloat(val.toString()) }
    case 'iban':
      return { iban: val.toString() }
    case 'name':
      return { name: val.toString() }
    case 'type':
      return { accountingType: getAccountingType(val.toString()) }
    default:
      return {}
  }
}

const list: FastifyPluginAsync = async (server: FastifyInstance, opt: FastifyPluginOptions) => {
  server.get('/list', { schema: listSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const client = await getClient()

      const data = await client?.scanDbEntries({
        scanStartAtTxId: Long.fromInt(1, true)
      }) as unknown as IDData[]
      if (data === undefined) { throw Error('no data') }
      const dataKeys = Object.keys(data)
      const accountings: Accounting[] = []
      for (const index of dataKeys) {
        const numericIndex = parseInt(index)
        const { key, val, id }: IDData = data[numericIndex]
        if (isAccountingData(key)) {
          const field = addFieldToAccounting(key, val)
          accountings[id.low] = { id: id.low, ...accountings[id.low], ...field }
        }
      }
      await client?.close()
      await reply.send(accountings)
    } catch (error) {
      server.log.error(error)
      await reply.code(500).send(error)
    }
  })
}

export default list
