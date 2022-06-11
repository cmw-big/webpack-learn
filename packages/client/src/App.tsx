import { lazy, Suspense } from 'react'
import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import ErrorBoundary from '@/errorBoundary'

const Edit = lazy(() => import('@/page/edit'))
const Detail = lazy(() => import('@/page/detail'))
const EditItem = lazy(() => import('@/page/editItem'))

export default function App() {
  return (
    <ErrorBoundary>
      <div className="w-full flex h-100 bg-green-500">
        <div className="">子元素</div>
        {/* <input type="text" className="flex-auto bg-gray-400 test" />
        <span className="cancel flex-auto">取消</span> */}
      </div>

      {/* <h1>我是App</h1> */}

      {/* ui导航 */}
      {/* <nav>
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
      </nav> */}
      {/* <Routes>
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
      </Routes> */}
    </ErrorBoundary>
  )
}
