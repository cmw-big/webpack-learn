import { lazy, Suspense } from 'react'
import { NavLink, Outlet, Route, Routes } from 'react-router-dom'

import ErrorBoundary from './errorBoundary'

const Edit = lazy(() => import('@/page/edit'))
const Detail = lazy(() => import('@/page/detail'))
const EditItem = lazy(() => import('@/page/editItem'))
// 这个上下文，赋值
export default function App() {
  return (
    <ErrorBoundary>
      <h1>我是App</h1>
      <nav>
        <NavLink
          style={({ isActive }) => {
            return {}
          }}
          className={isActive => {
            console.log(isActive, 'className')
            return undefined
          }}
          to="/edit"
        >
          <h1>edit</h1>
        </NavLink>
        <NavLink to="/detail">
          <h1>detail</h1>
        </NavLink>
        <NavLink to="/xxx">
          <h1>xxx</h1>
        </NavLink>
      </nav>

      <Routes>
        <Route path="/">
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
            path="detail"
            element={
              <Suspense fallback={<h1>loading......</h1>}>
                <Detail />
              </Suspense>
            }
          />
          <Route path="*" element={<h1>我啥也不匹配</h1>} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
