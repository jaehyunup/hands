import { JOIN_USER } from './types'
import { request } from '../utils/axios'

const USER_URL = '/api/user'

export function joinUser(dataToSubmit) {
  const data = request("POST", USER_URL+ '/home/join', dataToSubmit)

  return {
    type: JOIN_USER,
    payload: data,
  }
}