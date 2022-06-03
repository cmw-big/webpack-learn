import { type FC } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { randomObject } from '@mono/common'
import VirtualizedList from '@/components/virtualized-list/index'
import VirtualizeItem from '@/components/virtualized-list/item'

const Detail: FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="w-30 overflow-hidden">detail page</div>
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
              <VirtualizedList dataList={randomObject(100)}>
                <VirtualizeItem />
              </VirtualizedList>
            </div>
          }
        />
      </Routes>
    </div>
  )
}
export default Detail
