import { Reducer } from 'redux'
import {
  QUERY_STUDENT_LOADING,
  SET_STUDENTS_DATA,
  StudentData
} from '../actions/students'

const initialStudentsState = {
  studentData: { studentList: [], total: 0 } as StudentData,
  loading: false,
  fetchError: false
}
export type StudentState = typeof initialStudentsState

const studentsReducer: Reducer<typeof initialStudentsState> = function (
  state = initialStudentsState,
  action
) {
  switch (action.type) {
    case SET_STUDENTS_DATA:
      return { ...state, studentData: action.payload }
    case QUERY_STUDENT_LOADING:
      return { ...state, loading: action.payload }
    default:
      console.log(`未知的${action.type}`)
      return state
  }
}
export default studentsReducer
