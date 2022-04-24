type Func<T extends any[], R> = (...a: T) => R

export default function compose(): <R>(a: R) => R

export default function compose<F extends Func<unknown[], unknown>>(f: F): F

/* two functions */
export default function compose<A, T extends unknown[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>

export default function compose<R>(
  f1: (a: unknown) => R,
  ...funcs: Func<unknown[], unknown>[]
): Func<unknown[], R>

export default function compose<R>(
  ...func: Func<unknown[], unknown>[]
): Func<unknown[], R>

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param func The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export default function compose(...func: Func<unknown[], unknown>[]) {
  if (func.length === 0) {
    return (...args: unknown[]) => args
  }
  if (func.length === 1) {
    return func[0]
  }

  return func.reduce(
    (a, b) =>
      (...args: unknown[]) =>
        a(b(...args))
  )
}
