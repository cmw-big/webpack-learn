import { User } from '@/store/type'

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
