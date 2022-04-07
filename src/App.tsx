import { lazy, Suspense, useCallback, useMemo } from 'react'
import {
  createSelectorHook,
  shallowEqual,
  useDispatch,
  useSelector
} from 'react-redux'
import { NavLink, Route, Routes, Navigate } from 'react-router-dom'

import { StudentState } from '@/store/reducer/studentsReducer'
import useTimer from '@/hooks/useTimer'
import ErrorBoundary from '@/errorBoundary'
import { type StoreType } from '@/store'
import { createGetAllStudentsAction } from '@/store/actions/students'
import { createSelector } from 'reselect'
import { nanoid } from 'nanoid'
import { createAddUserAction } from '@/store/actions/usersAction'

const Edit = lazy(() => import('@/page/edit'))
const Detail = lazy(() => import('@/page/detail'))
const EditItem = lazy(() => import('@/page/editItem'))

const studentListSelector = (store: StoreType) => {
  console.log('我执行了')
  return store.student.studentData.studentList
}
const makeSelectStudentData = () =>
  createSelector(
    (state: StoreType) => {
      const { loading } = state.student
      console.log('我是loadingSelector')
      return loading
    },
    loading => {
      console.log(loading, 'list')
      return {
        loading
      }
    }
  )

// 这个上下文，赋值
export default function App() {
  const time = useTimer(3, 1000)
  const selector = useMemo(makeSelectStudentData, [])
  const studentState = useSelector<StoreType, { loading: boolean }>(
    selector,
    shallowEqual
  )
  const studentList = useSelector(studentListSelector, shallowEqual)

  const dispatch = useDispatch()
  // 处理获取数据的方法
  const handleClickFetchStudents = useCallback(() => {
    dispatch(createGetAllStudentsAction())
    dispatch(
      createAddUserAction({
        id: nanoid(),
        age: 1234,
        name: 'sds'
      })
    )
  }, [dispatch])

  // const studentElementList = studentState.studentList.map(student => (
  //   <li key={student.id}>{student.name}</li>
  // ))
  return (
    <ErrorBoundary>
      <h1>我是App</h1>
      <h2>{time}</h2>
      <button type="button" onClick={handleClickFetchStudents}>
        我获取所有的学生
      </button>
      {/* ui导航 */}
      <nav>
        <NavLink to="/edit">
          <h1>edit</h1>
        </NavLink>
        <NavLink
          to={{
            pathname: '/detail'
          }}
        >
          <h1>detail</h1>
        </NavLink>
        <NavLink to="/xxx">
          <h1>xxx</h1>
        </NavLink>
      </nav>
      <Routes>
        <Route>
          <Route
            path="edit"
            element={
              <Suspense fallback={<h1>loading......</h1>}>
                <Edit />
              </Suspense>
            }
          >
            <Route
              index
              element={<main>我是没有子路由匹配的时候时候展示的默认页面</main>}
            />
            <Route
              path=":editId"
              element={
                <Suspense fallback={<h1>loading......</h1>}>
                  <EditItem />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="detail/*"
            element={
              <Suspense fallback={<h1>loading......</h1>}>
                <Detail />
              </Suspense>
            }
          >
            1324123
          </Route>
          <Route
            path="*"
            element={<Navigate to="detail" replace state={{ a: 1 }} />}
          />
        </Route>
      </Routes>
      {/* <ul>{studentElementList}</ul> */}
    </ErrorBoundary>
  )
}
