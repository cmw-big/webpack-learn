import { delay, put, take, takeEvery } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import { nanoid } from 'nanoid'
import {
  createFetchUserAction,
  createUpdateUserAction,
  FETCH_USER
} from '../actions/usersAction'

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
// 会产生一个监听的。每次调用dispatch的时候，相应的回调就会执行
function* mySaga() {
  while (true) {
    //   调用dispatch后就卡在这里，不会进行接下来的工作
    const action: unknown = yield take(FETCH_USER)
    console.log(action as ReturnType<typeof createFetchUserAction>, 'action')
  }
}

export default mySaga
// export default function* () {
//   console.log('我执行')
//   yield takeEvery(FETCH_USER, fetchUser)
//   console.log('不会阻塞')
// }
