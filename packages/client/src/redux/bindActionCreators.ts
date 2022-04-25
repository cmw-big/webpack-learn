import { AnyAction } from 'redux'
import type {
  Action,
  ActionCreator,
  ActionCreatorsMapObject,
  Dispatch
} from './type'
import { kindOf } from './utils/kindOf'

/**
 * 创建action并分发action
 * @param actionCreators
 * @param dispatch
 * @returns
 */
export function bindActionCreator<A extends Action = AnyAction>(
  actionCreators: ActionCreator<A>,
  dispatch: Dispatch
) {
  return function (this: unknown, ...args: unknown[]) {
    return dispatch(actionCreators(...args))
  }
}

/**
 *
 * @param actionCreators action创建函数或者action创建函数的一个映射
 * @param dispatch 实例Store的dispatch方法
 *
 * 使用解惑：传入不同的泛型，可以确定返回的createAction的类型或者返回的action创建对象的的类型。
 */
export default function bindActionCreators<
  A extends Action,
  C extends ActionCreator<A>
>(actionCreator: C, dispatch: Dispatch): C

export default function bindActionCreators<
  A extends ActionCreator,
  B extends ActionCreator
>(actionCreator: A, dispatch: Dispatch): B

export default function bindActionCreators<
  A extends Action,
  B extends ActionCreatorsMapObject<A>
>(actionCreator: A, dispatch: Dispatch): B

export default function bindActionCreators<
  M extends ActionCreatorsMapObject,
  N extends ActionCreatorsMapObject
>(actionCreators: M, dispatch: Dispatch): N

export default function bindActionCreators(
  actionCreators: ActionCreator | ActionCreatorsMapObject,
  dispatch: Dispatch
) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, but instead received: '${kindOf(
        actionCreators
      )}'. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }
  const boundActionCreators: ActionCreatorsMapObject = {}
  //   如果传入的创建action是的函数对象的原型上也有创建action的方法，也会放到最终的bindActionCreators里面
  // eslint-disable-next-line guard-for-in
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
