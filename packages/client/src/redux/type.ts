export type Action<T = any> = {
  type: T
}

export interface AnyAction<T = any> extends Action<T> {
  [extraProps: string]: any
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T
}

declare const $CombinedState: unique symbol
interface EmptyObject {
  [$CombinedState]?: undefined
}

type CombinedState<S> = S & EmptyObject

/**
 * 初始化的State的类型
 */
export type PreloadedState<S> = Required<S> extends EmptyObject
  ? S extends CombinedState<infer S1>
    ? {
        [K in keyof S1]?: S1[K] extends object ? PreloadedState<S1[K]> : S1[K]
      }
    : S
  : {
      [K in keyof S]: S[K] extends string | number | boolean | symbol
        ? S[K]
        : PreloadedState<S[K]>
    }
/**
 * 创建action的函数接口
 * A是Action创建函数的返回类型
 * P就是一个action创建函数的参数类型
 */
export interface ActionCreator<
  A extends Action = AnyAction,
  P extends unknown[] = unknown[]
> {
  (...args: P): A
}

/**
 * 一个对象，里面是一个action创建函数的映射
 */
export interface ActionCreatorsMapObject<
  A extends Action = AnyAction,
  P extends unknown[] = unknown[]
> {
  [key: string]: ActionCreator<A, P>
}
/**
 * reducer的映射对象
 * Object whose values correspond to different reducer functions.
 * @template A The type of actions the reducers can potentially respond to.
 */
export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>
}

/**
 * combineReducers的返回reducer的state的类型
 */
export type StateFromReducersMapObject<M> = M extends ReducersMapObject
  ? {
      [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never
    }
  : never
