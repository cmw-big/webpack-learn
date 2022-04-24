import { User } from '@/store/type'

export const SET_LOGIN_USER_TYPE = Symbol('SET_LOGIN_USER_TYPE')

export function createSetLoginUserAction(user: User) {
  return {
    type: SET_LOGIN_USER_TYPE,
    payload: user
  }
}
