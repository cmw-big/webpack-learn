// 获取一个值的类型
export function miniKindOf(val: unknown): string {
  if (val === void 0) {
    return 'undefined'
  }
  if (val === null) {
    return 'null'
  }
  const type = typeof val
  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function': {
      return type
    }
  }
  if (Array.isArray(val)) {
    return 'array'
  }
  if (isDate(val)) {
    return 'date'
  }
  if (isError(val)) {
    return 'error'
  }
  const constructorName = ctorName(val)
  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName
  }
  // other
  return Object.prototype.toString
    .call(val)
    .slice(8, -1)
    .toLowerCase()
    .replace(/\s/g, '')
}
/**
 * 获取构造函数名
 */
function ctorName(val: any): string | null {
  return typeof val.constructor === 'function' ? val.constructor.name : null
}
/**
 * 判断是否是日期对象
 */
function isDate(val: any): val is Date {
  if (val instanceof Date) return true
  return (
    typeof val.toDateString === 'function' &&
    typeof val.getDate === 'function' &&
    typeof val.setDate === 'function'
  )
}
/**
 * 判断是否是错误对象
 */
function isError(val: any): val is Error {
  return (
    val instanceof Error ||
    (typeof val.message === 'string' &&
      val.constructor &&
      typeof val.constructor.stackTraceLimit === 'number')
  )
}

export function kindOf(val: unknown) {
  let typeOfVal: string = typeof val
  if (process.env.NODE_ENV !== 'production') {
    typeOfVal = miniKindOf(val)
  }
  return typeOfVal
}
