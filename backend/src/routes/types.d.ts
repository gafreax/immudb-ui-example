// import config from "../config.json";

// todo: add concrete configuration
// todo: add unit test
// todo: move type
// fixme: session trouble
// todo: add authentication

export type accountId = number
export type address = string
export type amount = number
export type iban = string
export type name = string
export interface Accounting {
  accountingType: AccountingType
  address: address
  amount: amount
  iban: iban
  id?: accountId
  name: name
}

export interface id {
  low: number
  high: number
  unsigned: boolean
}

export interface IDData {
  key: Buffer
  val: Buffer
  id: id
}

export interface AccountingFields {
  accountingType?: AccountingType
  address?: address
  amount?: amount
  iban?: iban
  name?: name
}
