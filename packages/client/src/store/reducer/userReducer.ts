import { nanoid } from 'nanoid'
import { Reducer } from 'redux'
import {
  ADD_USER,
  createAddUserAction,
  createDeleteUserAction,
  createUpdateUserAction,
  DELETE_USER,
  FETCH_USER,
  SET_LOADING,
  UPDATE_USER
} from '@/store/actions/usersAction'

export interface UserState {
  id: string
  name: string
  age: number
}

const initialUserState = {
  userList: [
    { id: nanoid(), name: 'John', age: 30 },
    { id: nanoid(), name: 'Tom', age: 12 }
  ] as UserState[],
  loading: false
}

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
const userReducer: Reducer<typeof initialUserState> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, userList: [...state.userList, action.payload] }
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter(user => user.id !== action.payload)
      }
    case UPDATE_USER:
      return {
        ...state,
        userList: state.userList.map(user => {
          const { payload } = action
          return user.id === payload.id ? { ...user, ...payload } : { ...user }
        })
      }
    case SET_LOADING:
      return {
        userList: [...state.userList],
        loading: action.payload.loading
      }
    case FETCH_USER:
      return {
        ...state
      }
    default:
      return state
  }
}
export default userReducer
