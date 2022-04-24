// 传入reducers的对象。返回一个reducer。
// 传入的reducers的对象的key作为返回的reducer的state的key，value是每一个reducer的返回值。
// 也就是说传入的reducers对象的每一个返回值组成了新的reducer的初始化的值。

import {
  Action,
  AnyAction,
  ReducersMapObject,
  StateFromReducersMapObject
} from './type'
import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'
import { kindOf } from './utils/kindOf'
import warning from './utils/waring'

/**
 * 验证每一个reducer的返回值是否是是undefined
 * @param reducers
 */
function assertReducerShape(reducers: ReducersMapObject) {
  Object.keys(reducers).forEach(key => {
    const reducer = reducers[key]
    const initialState = reducer(undefined, { type: ActionTypes.INIT })

    if (typeof initialState === 'undefined') {
      throw new Error(
        `The slice reducer for key "${key}" returned undefined during initialization. ` +
          `If the state passed to the reducer is undefined, you must ` +
          `explicitly return the initial state. The initial state may ` +
          `not be undefined. If you don't want to set a value for this reducer, ` +
          `you can use null instead of undefined.`
      )
    }

    if (
      typeof reducer(undefined, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION()
      }) === 'undefined'
    ) {
      throw new Error(
        `The slice reducer for key "${key}" returned undefined when probed with a random type. ` +
          `Don't try to handle '${ActionTypes.INIT}' or other actions in "redux/*" ` +
          `namespace. They are considered private. Instead, you must return the ` +
          `current state for any unknown actions, unless it is undefined, ` +
          `in which case you must return the initial state, regardless of the ` +
          `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}
function getUnexpectedStateShapeWarningMessage(
  inputState: object,
  reducers: ReducersMapObject,
  action: Action,
  unexpectedKeyCache: { [key: string]: true }
) {
  const reducerKeys = Object.keys(reducers)
  const myUnexpectedKeyCache: Record<string, true> = {}
  const argumentName =
    action && action.type === ActionTypes.INIT
      ? 'preloadedState argument passed to createStore'
      : 'previous state received by the reducer'

  if (reducerKeys.length === 0) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    )
  }

  if (!isPlainObject(inputState)) {
    return (
      `The ${argumentName} has unexpected type of "${kindOf(
        inputState
      )}". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    )
  }

  const unexpectedKeys = Object.keys(inputState).filter(
    key =>
      !Object.prototype.hasOwnProperty.call(reducers, 'key') &&
      !unexpectedKeyCache[key]
  )

  unexpectedKeys.forEach(key => {
    myUnexpectedKeyCache[key] = true
  })

  if (action && action.type === ActionTypes.REPLACE) return undefined

  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    )
  }
  return undefined
}

export default function combineReducers(reducers: ReducersMapObject) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers: ReducersMapObject = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] !== 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  let unexpectedKeyCache: Record<string, true>
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }
  let shapeAssertionError: unknown
  try {
    assertReducerShape(finalReducers)
  } catch (error) {
    shapeAssertionError = error
  }

  /**
   * 返回一个组合后的reducer
   * @param state 有可能是初始化，有可能是后面调用的reducer的返回值。初始化的话。如果是空对象，值就是来自与每一个reducer的默认值。
   */
  return function combination(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction
  ) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }
    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )
      if (warningMessage) {
        warning(warningMessage)
      }
    }
    const nextState: StateFromReducersMapObject<typeof reducers> = {}
    let hasChanged = false
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i] // 传入的reducer的key
      const reducer = finalReducers[key] // 传入的reducer
      const previousStateForKey = state[key] // reducer传入的state。也就是初始化的state
      const nextStateForKey = reducer(previousStateForKey, action) // 传入的state[key]的state作为当前reducer调用的初始值
      // 对于nextStateForKey的报警
      if (typeof nextStateForKey === 'undefined') {
        const actionType = action && action.type
        throw new Error(
          `When called with an action of type ${
            actionType ? `"${String(actionType)}"` : '(unknown type)'
          }, the slice reducer for key "${key}" returned undefined. ` +
            `To ignore an action, you must explicitly return the previous state. ` +
            `If you want this reducer to hold no value, you can return null instead of undefined.`
        )
      }
      nextState[key] = nextStateForKey
      //   判断当前初始化的值与reducer返回的值是否一致。如果不一致，就是有改变
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 如果初始化的state的长度与对应的的reducersMap的长度不一致的话，也是有改变的。
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length
    //   只要有改变的话，就直接返回通过调用reducer的返回值组成的对象。
    // 如果没有改变的话，就直接返回初始值。
    return hasChanged ? nextState : state
  }
}
