import { forwardRef, ForwardRefRenderFunction, useLayoutEffect } from 'react'
import useTimer from '../hooks/useTimer'

let a: any
// ref是确定的一个
const A: ForwardRefRenderFunction<HTMLHeadingElement> = (props, ref) => {
  const time = useTimer(3, 1000)
  useLayoutEffect(() => {
    const btn = document.getElementById('btn')
    if (btn) {
      btn.style.fontSize = '20px'
    }
    const start = Date.now()
    while (Date.now() - start < 1000) {
      a = time
    }
  }, [time])
  return (
    <>
      <h1 ref={ref}>time:{time}</h1>
      <button id="btn" type="button">
        改变title
      </button>
    </>
  )
}

export default forwardRef<HTMLHeadingElement>(A)
