import { lazy, Suspense, useRef, useState } from 'react'
import { AContext } from './context'
import ErrorBoundary from './errorBoundary'

const A = lazy(() => import('./components/A'))

// 这个上下文，赋值
export default function App() {
  // react会内部缓存State的状态，所以这里的通过SetCount改变的值，不会重新继续初始化。
  const [count, setCount] = useState(0)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  return (
    <ErrorBoundary>
      <AContext.Provider value={count}>
        <Suspense fallback={<h1>我在加载</h1>}>
          <A ref={h1Ref} />
        </Suspense>
        <div id="parent">
          <div
            ref={divRef}
            id="child"
            onClick={() => {
              setCount(count + 1)
            }}
          >
            儿子
          </div>
        </div>
      </AContext.Provider>
    </ErrorBoundary>
  )
}
