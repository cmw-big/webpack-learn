import {} from 'redux'
import { Action, AnyAction, Dispatch, Reducer } from './type'

function isPlainObject(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.getPrototypeOf(obj) === Object.prototype
  )
}
function getRandomString(len: number) {
  return Math.random().toString(36).substring(2, len).split('').join('.')
}

export function createStore(reducer: any, defaultState: any) {
  const currentReducer = reducer
  let currentState = defaultState
  const listeners: any[] = []

  const dispatch: Dispatch = action => {
    if (!isPlainObject(action)) {
      throw new TypeError('action must be a plain object')
    }
    if (action.type === undefined) {
      throw new TypeError('action must has a property of type')
    }
    // 第一次创建store的时候，就会执行当前传入的reducer
    currentState = currentReducer(currentState, action)
    // 运行所有的监听器
    for (const listener of listeners) {
      listener()
    }
    return action
  }
  function getState() {
    return currentState
  }
  // 添加订阅
  function subscribe(listener: (...arg: any[]) => void) {
    listeners.push(listener)
    let isRemove = false
    // 返回一个取消订阅的方法。如果已经移除过了，就直接返回
    return function unSubscribe() {
      if (isRemove) {
        return
      }
      listeners.splice(listeners.indexOf(listener), 1)
      isRemove = true
    }
  }

  dispatch({
    type: `@@redux/INIT${getRandomString(7)}`
  })
  return {
    dispatch,
    getState,
    subscribe
  }
}
