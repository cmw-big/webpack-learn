/* eslint-disable react/jsx-pascal-case */
import React, {
  Component,
  createContext,
  createRef,
  lazy,
  RefObject,
  Suspense,
  SyntheticEvent
} from 'react'
import { createPortal } from 'react-dom'
import { AContext } from './context'
import ErrorBoundary from './layout'

const A = lazy(() => import('./components/A'))

// 这个上下文，赋值

export default class App extends Component {
  static contextType = createContext({ a: 1 })

  A: RefObject<HTMLHeadingElement> = createRef()

  state = {
    a: 1
  }

  constructor(props: any) {
    super(props)
    const { a } = this.state
    this.setState(
      {
        a: a + 1
      },
      () => {
        console.log(this.state.a)
      }
    )
  }

  componentDidMount() {
    //   render已经执行完成，可以进行网络数据的获取，然后重新进行setState
  }

  render() {
    return (
      <ErrorBoundary>
        <AContext.Provider value={this.state}>
          <Suspense fallback={<h1>我在加载</h1>}>
            <A ref={this.A} />
          </Suspense>
          <div id="parent">
            <div id="child">儿子</div>
          </div>
        </AContext.Provider>
        {createPortal(<h1>我在外面的h1</h1>, document.body)}
      </ErrorBoundary>
    )
  }
}
