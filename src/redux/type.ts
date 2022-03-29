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
