/**
 * 从T类型中，将其中一部分K类型变成可选
 */
export type PartialProps<T extends K, K> = Partial<K> & Omit<T, keyof K>

/**
 * 从T类型中，将其中一部分属性名为K的属性变成可选
 */
export type PartialProp<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
