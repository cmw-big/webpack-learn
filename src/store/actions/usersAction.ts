import { User } from '@/store/type'
import { nanoid } from 'nanoid'
import { Action, AnyAction, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { type UserState } from '../reducer/userReducer'

export const ADD_USER = Symbol('ADD_USER')
export const DELETE_USER = Symbol('DELETE_USER')
export const UPDATE_USER = Symbol('UPDATE_USER')
export const SET_LOADING = Symbol('SET_LOADING')
export const FETCH_USER = Symbol('FETCH_USER')
export const createAddUserAction = (user: User) => ({
  type: ADD_USER,
  payload: user
})
export const createDeleteUserAction = (id: User['id']) => ({
  type: DELETE_USER,
  payload: id
})

export const createUpdateUserAction = (
  id: User['id'],
  newUserData: Partial<User>
) => ({ type: UPDATE_USER, payload: { ...newUserData, id } })

export const createSetLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  payload: {
    loading
  }
})

export const createFetchUserAction = (
  payload: Record<string | number, any>
) => ({
  type: FETCH_USER,
  payload
})

// fetchUsers action，可以带有副作用
// export function fetchUsers(): ThunkAction<
//   Promise<void>,
//   UserState,
//   any,
//   AnyAction
// > {
//   // 由于thunk的存在，允许action是一个带有副作用的函数
//   return async function (dispatch: Dispatch) {
//     dispatch(createSetLoadingAction(true)) // 正在加载
//     // const users = await getAllStudents()
//     const action = createAddUserAction({
//       id: nanoid(),
//       name: 'test',
//       age: 12
//     })
//     dispatch(action)
//     dispatch(createSetLoadingAction(false))
//   }
// }
