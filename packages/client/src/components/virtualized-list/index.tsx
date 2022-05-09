/**
 * 虚拟列表组件
 */

import { forwardRef, type ForwardRefRenderFunction } from 'react'
import { randomObject } from 'common'
import VirtualizeItem from './item'
// export interface VirtualizedListProps {}

const VirtualizedList: ForwardRefRenderFunction<Element> = props => {
  const dataList = randomObject(100)
  return (
    <ul className="h-500 overflow-auto">
      {dataList.map((item, index) => {
        return <VirtualizeItem key={item.id} index={index} />
      })}
    </ul>
  )
}
export default forwardRef(VirtualizedList)
