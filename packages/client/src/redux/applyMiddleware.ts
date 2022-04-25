import {
  AnyAction,
  Middleware,
  MiddlewareAPI,
  StoreEnhancerStoreCreator,
  PreloadedState
} from 'redux'
import compose from '@/redux/compose'
import type { Dispatch, Reducer } from './type'

export default function applyMiddleware(...middlewares: Middleware[]) {
  return (createStore: StoreEnhancerStoreCreator) => {
    return <S, A extends AnyAction>(
      reducer: Reducer<S, A>,
      preloadState?: PreloadedState<S>
    ) => {
      const store = createStore(reducer, preloadState)
      //   不能在构建dispatch链式调用的时候调用。也就是说，不能再middlewares函数中调用
      const dispatch: Dispatch = () => {
        throw new Error(
          'Dispatching while constructing your middleware is not allowed. ' +
            'Other middleware would not be applied to this dispatch.'
        )
      }
      const middlewareAPI: MiddlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      // 这样传递之后，chain数组里面全是生成dispatch的方法
      //   然后我们就要确定生成后的dispatch被调用后，怎么传递调用的值。
      // dispatch = compose(chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}
type a = ((next: Dispatch<AnyAction>) => (action: any) => any)[]
type b = (...args: any[]) => any
