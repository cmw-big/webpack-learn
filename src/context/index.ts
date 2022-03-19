import { createContext } from 'react'

// 提供一个上下文。
export const AContext = createContext<{ a: number }>({ a: 2 })
