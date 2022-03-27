import { FC, useRef } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import A from '@/components/A'

const Detail: FC = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null)
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
        {/* index的优先级要高一点 */}
        {/* <Route index element={<h1>我是detail默认的内容</h1>} /> */}
        {/* index写入多个的话，只会有一个生效 */}
        {/* <Route index element={<h1>我是detail默认的内容2222</h1>} /> */}
        <Route path=":id" element={<A ref={h1Ref} />} />
        <Route
          path="/"
          element={<h1>我是detail的根路径，这里的/是相对于父路径匹配的内容</h1>}
        />
      </Routes>
    </div>
  )
}
export default Detail
