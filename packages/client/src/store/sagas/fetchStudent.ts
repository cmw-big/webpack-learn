import { call, put, takeEvery } from 'redux-saga/effects'
import { getAllStudents } from '@/services/student'

import {
  createQueryStudentLoading,
  createSetStudentsDataAction,
  GET_ALL_STUDENTS,
  Student
} from '@/store/actions/students'

function* queryAllStudents() {
  // yield put(createQueryStudentLoading(true))
  // const studentList: Student[] = yield call(getAllStudents)
  yield put(createQueryStudentLoading(false))
  // yield put(
  //   createSetStudentsDataAction({
  //     studentList,
  //     total: studentList.length
  //   })
  // )
}

export default function* () {
  try {
    yield takeEvery(GET_ALL_STUDENTS, queryAllStudents)
  } catch (error) {
    console.warn(error)
  }
}
