import {
  bindActionCreators,
  createStore,
  applyMiddleware,
  Action,
  MiddlewareAPI,
  Dispatch
} from 'redux'

import rootReducer from '@/store/reducer'

const logger1 = ({ getState }: MiddlewareAPI) => {
  console.log('out1')
  return (next: Dispatch) => {
    console.log('int out1')
    return (action: Action) => {
      console.log('logger1', action)
      const returnValue = next(action)
      console.log('state after dispatch', getState())
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue
    }
  }
}
const logger2 = ({ getState }: MiddlewareAPI) => {
  console.log('out2')
  return (next: Dispatch) => {
    console.log('int out2')
    return (action: Action) => {
      console.log('logger2', action)
      const returnValue = next(action)
      console.log('state after dispatch', getState())
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue
    }
  }
}
const store = createStore(rootReducer, applyMiddleware(logger1, logger2))
store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})

export default store
