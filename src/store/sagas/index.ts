import { all } from 'redux-saga/effects'
import fetchUser from './fetchUser'
import studentTask from './fetchStudent'
// 这个函数当前只会执行一次
export default function* () {
  yield all([fetchUser(), studentTask()])
  console.log('saga完成')
}
