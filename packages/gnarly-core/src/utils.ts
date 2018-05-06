import BN = require('bn.js')
import numberToBN = require('number-to-bn')
import web3Utils = require('web3-utils')

import * as pMap from 'p-map'

import IABIItem, { IABIItemInput } from './models/ABIItem'
import {
  IPathThing,
} from './Ourbit'

export const parsePath = (path) => {
  const [
    _,
    scope,
    tableName,
    pk,
    indexOrKey,
  ] = path.split('/')
  return {
    scope,
    tableName,
    pk,
    indexOrKey,
  }
}

export const toBN = (v: string | number | BN): BN => numberToBN(v)

export const forEach = async (iterable, mapper, opts = { concurrency: 10 }) => {
  return pMap(iterable, mapper)
}

export const addressesEqual = (left, right) => {
  return left && right && left.toLowerCase() === right.toLowerCase()
}

const buildEventSignature = (item: IABIItem) => {
  return web3Utils._jsonInterfaceMethodToString(item)
}

export const enhanceAbiItem = (item: IABIItemInput): IABIItem => {
  const fullName = web3Utils._jsonInterfaceMethodToString(item)
  const signature = web3Utils.sha3(fullName)
  const shortId = signature.substr(0, 10)

  return {
    ...item,
    fullName,
    signature,
    shortId,
  }
}

// we dont' do anything special here, but it helps add structure
// ¯\_(ツ)_/¯
export const makeRootTypeStore = (typestore) => typestore

export const getMethodId = (input: string) => input.substr(0, 10)
// ^0x12345678

export const toHex = (num: BN) => `0x${num.toString(16)}`

export const timeout = async (ms: number = 1000) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms))
