import { all } from 'redux-saga/effects'
import studentTask from './fetchStudent'
// 这个函数当前只会执行一次
export default function* () {
  yield all([studentTask()])
}
