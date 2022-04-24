import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useState
} from 'react'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'

const A: ForwardRefRenderFunction<HTMLHeadingElement> = (props, ref) => {
  const [inProp, setInProp] = useState(false)
  const handleShow = useCallback(() => {
    setInProp(true)
  }, [])

  return (
    <>
      <Transition mountOnEnter in={inProp} timeout={500}>
        {state => <div>{state}</div>}
      </Transition>
      <Link to="/a" />
      <h1 ref={ref}>time:{}</h1>
      <button id="btn" type="button" onClick={handleShow}>
        show
      </button>
    </>
  )
}

export default forwardRef<HTMLHeadingElement>(A)
