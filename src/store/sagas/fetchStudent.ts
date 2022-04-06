import { getAllStudents } from '@/services/student'
import { Task } from 'redux-saga'
import {
  all,
  call,
  cancel,
  delay,
  fork,
  ForkEffect,
  put,
  takeEvery
} from 'redux-saga/effects'
import {
  createQueryStudentLoading,
  createSetStudentsDataAction,
  GET_ALL_STUDENTS,
  Student
} from '../actions/students'

export function* fetchAllStudents() {
  yield put(createQueryStudentLoading(true))
  const studentList: Student[] = yield call(getAllStudents)
  yield put(createQueryStudentLoading(false))
  yield put(
    createSetStudentsDataAction({
      total: studentList.length,
      studentList
    })
  )
}

function* handleDelay() {
  yield call(getAllStudents)
}

function* fetchAll() {
  const task1: Task = yield fork(handleDelay)
  yield cancel(task1)
  yield fork(handleDelay)
  yield delay(1000)
}

export default function* () {
  yield takeEvery(GET_ALL_STUDENTS, fetchAllStudents)
  try {
    yield call(fetchAll)
  } catch (error) {
    console.warn(error)
  }
  console.log('我不阻塞')
}
