import React, { ForwardedRef, forwardRef } from 'react'
import { AContext } from '../context'

function A(props: any, ref: ForwardedRef<HTMLHeadingElement>) {
  return (
    <AContext.Consumer>
      {/* 子组件消费上下文的数据 */}
      {value => <h1 ref={ref}>h1{value.a}</h1>}
    </AContext.Consumer>
  )
}

export default forwardRef<HTMLHeadingElement, any>(A)
