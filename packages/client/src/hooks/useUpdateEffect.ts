import { useEffect, useRef } from 'react'

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const firstMounted = useRef(true)
  useEffect(() => {
    if (!firstMounted.current) {
      effect()
    }
    firstMounted.current = false
  }, deps)
}
