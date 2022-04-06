import { nanoid } from 'nanoid'
import { AnyAction } from 'redux'
import { delay, put, takeEvery } from 'redux-saga/effects'
import { createUpdateUserAction, FETCH_USER } from '../actions/usersAction'

let count = 0
function* fetchUser(action: AnyAction) {
  count++
  try {
    const user: Record<string, any> = yield delay(count ? 1000 : 2000)
    put(createUpdateUserAction(nanoid(), user))
  } catch (error) {
    console.log('错误', error)
  }
}

export default function* () {
  yield takeEvery(FETCH_USER, fetchUser)
}
