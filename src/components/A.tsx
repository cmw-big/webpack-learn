import { ForwardedRef, forwardRef, useContext } from 'react'
import { AContext } from '../context'

function A(props: any, ref: ForwardedRef<HTMLHeadingElement>) {
  // 得到当前最近的上下文组件提供的值。
  const count = useContext(AContext)
  return <h1 ref={ref}>count:{count}</h1>
}

export default forwardRef<HTMLHeadingElement, any>(A)
