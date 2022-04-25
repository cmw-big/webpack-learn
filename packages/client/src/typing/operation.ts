/* eslint-disable prettier/prettier */
// 把一个对象里面的某个属性变成可选的。
// 剔除属性后，然后把它变成可选的。
export type PartialProps<T extends K, K> = Partial<T> & Omit<T, keyof K>


