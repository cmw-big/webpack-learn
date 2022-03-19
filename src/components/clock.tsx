import React, { ForwardedRef, forwardRef, FunctionComponent } from 'react'

interface IProps {
  count: number
}

// 把
const test = (props: IProps, ref: ForwardedRef<HTMLHeadingElement>) => {
  return <h1 ref={ref}>name</h1>
}
export const witchRef = forwardRef<HTMLHeadingElement, IProps>(test)

const clock: FunctionComponent<IProps> = props => {
  return <div>{props.count}</div>
}

export default clock
