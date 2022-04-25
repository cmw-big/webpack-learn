export const GET_ALL_STUDENTS = Symbol('GET_ALL_STUDENTS')
export const QUERY_STUDENT_LOADING = Symbol('QUERY_STUDENT_LOADING')
export const SET_STUDENTS_DATA = Symbol('SET_STUDENTS_DATA')

export function createGetAllStudentsAction() {
  return {
    type: GET_ALL_STUDENTS
  }
}

export function createQueryStudentLoading(loading: boolean) {
  return {
    type: QUERY_STUDENT_LOADING,
    payload: loading
  }
}

export interface Student {
  address: string
  appkey: string
  birth: number
  ctime: number
  email: `${any}@${any}.${any}`
  id: number
  name: string
  phone: `${number}`
  sNo: `${string}`
  sex: 1 | 0
  utime: number
}
export interface StudentData {
  studentList: Student[]
  total: number
}
export function createSetStudentsDataAction(StudentData: StudentData) {
  return {
    type: SET_STUDENTS_DATA,
    payload: StudentData
  }
}
