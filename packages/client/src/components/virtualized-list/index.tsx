/**
 * 虚拟列表组件
 */

import {
  type CSSProperties,
  useState,
  useEffect,
  useRef,
  useCallback,
  type UIEventHandler,
  type FC
} from 'react'
import { nanoid } from 'nanoid'
import { useEffectMounted } from './hooks'

export interface VirtualizedListProps {
  fixed?: boolean
  bufferSize?: number
  dataList: any[]
  fixedHeight?: number
}

let VISIBLE_COUNT = 0 // 可视元素的个数

type dataItem = VirtualizedListProps['dataList'][number]
interface FilterData extends dataItem {
  index: number
  scrollY: number
}

const VirtualizedList: FC<VirtualizedListProps> = props => {
  const {
    fixed = true,
    bufferSize = 3,
    dataList = [],
    fixedHeight = 100,
    children
  } = props
  // 总的scrollHeight=数据的长度*每一个元素的高度
  const [scrollRunwayEnd, setScrollRunwayEnd] = useState(0)
  const ListRef = useRef<HTMLUListElement>(null)
  // 可视数据
  const [visibleData, setVisibleData] = useState<FilterData[]>([])
  const [filterData, setFilterData] = useState<FilterData[]>([])
  // 可视数据的挂载元素的索引
  const [firstIndex, setFirstIndex] = useState(0)
  const [lastAttachedItem, setLastAttachedItem] = useState(0)
  // 上一次滚动的距离
  const [lastScrollTop, setLastScrollTop] = useState(0)

  // 设置相应的scrollY的值，增加的值
  const calItemScrollY = useCallback(
    (list: typeof dataList) => {
      return list.map((item, index) => {
        return {
          ...item,
          index,
          scrollY: scrollRunwayEnd + index * fixedHeight
        }
      })
    },
    [fixedHeight, scrollRunwayEnd]
  )

  // 首次渲染执行：需要确定可视区域的数据，尾元素索引和整个容器的scrollHeight
  useEffectMounted(() => {
    VISIBLE_COUNT = Math.ceil(
      (ListRef.current?.offsetHeight ?? 0) / fixedHeight
    )
    setLastAttachedItem(VISIBLE_COUNT + bufferSize + 1)
    setFilterData(calItemScrollY(dataList))
    setScrollRunwayEnd(dataList.length * fixedHeight)
  })

  // 处理滚动
  const handleScroll: UIEventHandler<HTMLUListElement> = useCallback(() => {
    const scrollTop = ListRef?.current?.scrollTop ?? 0
    setLastScrollTop(scrollTop)
    const isUpward = scrollTop < lastScrollTop
    const index = Math.floor((scrollTop ?? 0) / fixedHeight)
    // 如果是向上，那么就需要及时更新，如果是向下的话，则需要吧缓冲区域的给清空才进行更新
    if ((!isUpward && index - firstIndex >= bufferSize) || isUpward) {
      // firstIndex最小值也只能是0
      setFirstIndex(Math.max(0, index - bufferSize))
    }
  }, [bufferSize, firstIndex, fixedHeight, lastScrollTop])

  // 更新相应的数据
  useEffect(() => {
    // 更新尾元素索引,因为有可能尾元素大于整个数据的长度，所以，最长也只能是数据的长度
    setLastAttachedItem(
      Math.min(firstIndex + VISIBLE_COUNT + bufferSize * 3, filterData.length)
    )
    // 更新「可视元素」
    setVisibleData(filterData.slice(firstIndex, lastAttachedItem))
  }, [bufferSize, filterData, filterData.length, firstIndex, lastAttachedItem])

  return (
    <ul
      className="h-500 overflow-auto relative"
      ref={ListRef}
      onScroll={handleScroll}
    >
      {/* 撑开整个容器的元素。 */}
      <li
        style={{ '--tw-translate-y': `${scrollRunwayEnd}px` } as CSSProperties}
        className="opacity-0 absolute w-1 h-1 duration-200 transform-gpu transition-transform transform"
      />
      {visibleData.map((item, index) => {
        return (
          <div
            key={nanoid()}
            style={{
              transform: ` translate(0, ${item.scrollY}px)`,
              willChange: 'transform',
              contain: 'layout',
              background: '#008c8c'
            }}
          >
            {children}
          </div>
        )
      })}
    </ul>
  )
}
export default VirtualizedList
