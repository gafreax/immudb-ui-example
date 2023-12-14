export const headerJSONSchema = {
  type: 'object',
  properties: {
    'x-immudb-ui': { type: 'string' }
  },
  required: ['x-immudb-ui']
}

export const listSchema = {
  headers: headerJSONSchema
}

export const bodyJSONSchema = {
  type: 'object',
  properties: {
    address: { type: 'string' },
    amount: { type: 'number' },
    iban: { type: 'string' },
    name: { type: 'string' },
    accountingType: { type: 'string' }
  },
  required: ['address', 'amount', 'iban', 'name', 'accountingType']
}

export const addSchema = {
  body: bodyJSONSchema,
  headers: headerJSONSchema
}
