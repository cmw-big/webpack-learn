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

/**
 * 空对象
 */
interface EmptyObject {
  readonly [$CombinedState]?: undefined
}
/**
 * 组合state与空对象
 */
export type CombinedState<S> = EmptyObject & S

/**
 * 初始化的state
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

// CombinedState类型一定是EmptyObject类型，EmptyObject类型不一定是CombinedState类型

const a: EmptyObject = {
  [Symbol('')]: 1
}
const s = Symbol('ss')
const b: CombinedState<{ a: 1 }> = {
  a: 1,
  [Symbol('')]: 1
}
const c: CombinedState<{ a: 1 }> = {
  a: 1
}
interface t {
  a: 1
}

const d: CombinedState<t> = {
  a: 1
}

let f: t = {
  a: 1
}

f = d

const ss = d[$CombinedState]
