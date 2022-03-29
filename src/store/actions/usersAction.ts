import { AnyAction } from 'redux'
import { User } from '@/store/type'

export const ADD_USER = Symbol('ADD_USER')
export const DELETE_USER = Symbol('DELETE_USER')
export const UPDATE_USER = Symbol('UPDATE_USER')

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
