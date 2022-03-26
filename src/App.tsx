import { lazy, Suspense, useCallback, useState } from 'react'
import { AContext } from './context'
import ErrorBoundary from './errorBoundary'

const A = lazy(() => import('./components/A'))

export default function App() {
  const [a, setA] = useState(1)
  const handleClick = useCallback(() => {
    setA(a + 1)
    console.log('a', '我是a')
  }, [a])

  return (
    <ErrorBoundary>
      <AContext.Provider value={1}>
        <Suspense fallback={<h1>我在加载</h1>}>
          <A />
        </Suspense>
        <div id="parent">
          <div id="child" onClick={handleClick}>
            儿子
          </div>
          <div>{a}</div>
        </div>
      </AContext.Provider>
    </ErrorBoundary>
  )
}
