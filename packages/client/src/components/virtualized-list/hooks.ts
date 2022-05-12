import { useEffect, useRef } from 'react'

type DeepReadonly<T> = T extends (infer U)[]
  ? DeepReadonlyArray<U>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? T
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Object
  ? DeepReadonlyObject<T>
  : T
//  把数组或者对象变成只读
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>
type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export function useEffectMounted(callback: () => void | (() => void)) {
  const isFirst = useRef(true)
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      //   执行首次渲染完成后
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
