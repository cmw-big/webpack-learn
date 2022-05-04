import { type FC } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import VirtualizedList from '@/components/virtualized-list'

const Detail: FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div>detail page</div>
      <button
        type="button"
        onClick={() => {
          navigate('/detail/13')
        }}
      >
        to detail Id page
      </button>
      <Routes>
        <Route
          path="/"
          element={
            <h1>我是detail的根路径，这里的/是相对于detail父路径匹配的内容</h1>
          }
        />
        {/* index的优先级要高一点 */}
        <Route
          index
          element={
            <div>
              <VirtualizedList />
            </div>
          }
        />
      </Routes>
    </div>
  )
}
export default Detail
