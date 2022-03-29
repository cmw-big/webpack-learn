import { nanoid } from 'nanoid'
import { Reducer } from 'redux'
import { UPDATE_USER } from '../actions/usersAction'
import {
  ADD_USER,
  createAddUserAction,
  createDeleteUserAction,
  createUpdateUserAction,
  DELETE_USER
} from '@/store/actions/usersAction'

export interface UserState {
  id: string
  name: string
  age: number
}

const initialUserState: UserState[] = [
  { id: nanoid(), name: 'John', age: 30 },
  { id: nanoid(), name: 'Tom', age: 12 }
]

export type UserAction =
  | ReturnType<typeof createAddUserAction>
  | ReturnType<typeof createDeleteUserAction>
  | ReturnType<typeof createUpdateUserAction>

/**
 *
 * @param state - user的状态
 * @param action 触发user的类型
 * @returns user的状态
 */
const userReducer: Reducer<UserState[]> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload]
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload)
    case UPDATE_USER:
      return state.map(user => {
        const { payload } = action
        return user.id === payload.id ? { ...user, ...payload } : { ...user }
      })
    default:
      return state
  }
}
export default userReducer
