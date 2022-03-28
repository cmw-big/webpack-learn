import { lazy, Suspense } from 'react'

export function createLazyModule(path: string) {
  const LazyComponent = lazy(() => import(`${path}`))
  return (
    <Suspense fallback={<h1>loading......</h1>}>
      <LazyComponent />
    </Suspense>
  )
}
