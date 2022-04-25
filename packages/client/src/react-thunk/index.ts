import { AnyAction, Dispatch, Store } from 'redux'

type getState<S> = () => S
// 创建一个chunk中间件thunk中间件
function createThunkMiddleware<ext>(extra?: ext) {
  interface thunk {
    withExtraArgument: thunk
  }
  function thunk(store: Store) {
    return (next: Dispatch) =>
      (
        action:
          | AnyAction
          | ((
              dispatch: Dispatch,
              getState: getState<Store>,
              extra?: ext
            ) => AnyAction)
      ) => {
        // 如果action是一个函数，那么就返回函数的返回结果。但是没有调用next方法
        if (typeof action === 'function') {
          // 相当于把dispatch交给action中去了。
          //   如果action不进行dispatch的话。那么会卡在这个这个地方
          //   说明，如果有thunk中间件的话，最好将它放在第一位，否则可能它前面的中间件不会执行。
          return action(store.dispatch, store.getState, extra)
        }
        // 这里的next其实就是后面一个的中间件的返回值：(action)=>{xxx} 函数
        return next(action)
      }
  }
  return thunk
}

const thunk = createThunkMiddleware()
export default thunk
