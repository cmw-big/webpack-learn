import { ForwardedRef, forwardRef, useContext } from 'react'
import { AContext } from '../context'
import useTimer from '../hooks/useTimer'

function A(props: any, ref: ForwardedRef<HTMLHeadingElement>) {
  // 得到当前最近的上下文组件提供的值。
  const count = useContext(AContext)
  const time = useTimer(3, 1000)
  return (
    <>
      <h1 ref={ref}>time:{time}</h1>
      <button type="button">改变title</button>
    </>
  )
}

export default forwardRef<HTMLHeadingElement, any>(A)
