/**
 * 虚拟列表组件
 */

import {
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC
} from 'react'
import { nanoid } from 'nanoid'
import VirtualizeItem from './item'

const height = 60
const bufferSize = 5

interface VirtualizedListProps {
  scrollWrapDom?: HTMLElement
}

interface AnchorItem {
  index: number
  top: number
  bottom: number
}

const VirtualizedList: FC<VirtualizedListProps> = props => {
  const { scrollWrapDom = document.getElementById('scroll')! } = props
  const [visibleData, setVisibleData] = useState(new Array(1000).fill(true))
  //   开始和结束时的index,遵循左闭右开的原则
  const [{ startIndex, endIndex }, setIndexInfo] = useState({
    startIndex: 0,
    endIndex: 0
  })
  //   开始和结束时候的offset
  const [{ startOffset, endOffset }, setOffset] = useState({
    startOffset: 0,
    endOffset: 0
  })
  //   滚动的距离
  const [scrollTop, setScrollTop] = useState(0)
  //  当前可视的数量
  const [visibleCount, setVisibleCount] = useState(
    Math.ceil((scrollWrapDom || document.body).clientHeight / height)
  )
  // 记录已经渲染元素的位置信息
  const anchorList = useRef<AnchorItem[]>([])
  // 锚点元素相关的位置信息
  const [{ index, top, bottom }, setAnchorItem] = useState({
    index: 0,
    top: 0,
    bottom: 0
  })
  /**
   * 更新可视区域的数据
   */
  const updateVisibleData = useCallback(() => {
    const data = visibleData.slice(startIndex, endIndex)
    const endOffset = (data.length - endIndex) * height
    setOffset({
      startOffset,
      endOffset
    })
    setVisibleData(data)
  }, [visibleData, startIndex, endIndex, startOffset])
  /**
   * 计算渲染的元素个数,并进行设置渲染的数据
   */
  useEffect(() => {
    // setVisibleCount(
    //   Math.ceil((scrollWrapDom || document.body).clientHeight / height) +
    //     bufferSize
    // )
    // setIndexInfo({
    //   startIndex,
    //   endIndex: startIndex + visibleCount
    // })
    // updateVisibleData()
  }, [scrollWrapDom, startIndex, updateVisibleData, visibleCount])

  // 更新某一个信息
  const cachePosition = (node: Element | null, index: number) => {
    const rect = node?.getBoundingClientRect()
    const top = rect?.top ?? 0 + scrollWrapDom.scrollHeight
    anchorList.current.push({
      index,
      top,
      bottom: top + height
    })
  }
  const handleScroll: UIEventHandler<HTMLDivElement> = e => {
    const { scrollTop: newScrollTop } = e.target as HTMLDivElement
    if (newScrollTop > scrollTop) {
      if (scrollTop > bottom) {
        updateBoundaryIndex(newScrollTop)
        updateVisibleData()
      }
    } else if (newScrollTop < scrollTop) {
      if (newScrollTop < top) {
        updateBoundaryIndex(newScrollTop)
        updateVisibleData()
      }
    }
    setScrollTop(newScrollTop)
  }
  // 计算startIndex和endIndex
  const updateBoundaryIndex = (scrollTop = 0) => {
    const anchorItem = anchorList.current.find(item => item.bottom >= scrollTop)
    if (!anchorItem) {
      return
    }
    setAnchorItem({ ...anchorItem })

    setIndexInfo({
      startIndex: anchorItem.index,
      endIndex: anchorItem.index + visibleCount
    })
  }

  return (
    <div
      onScroll={handleScroll}
      id="scroll"
      style={{ height: '500px', overflow: 'auto' }}
    >
      <div
        style={{
          paddingTop: `${startOffset}px`,
          paddingBottom: `${endOffset}px`
        }}
      >
        {/* 虚拟列表 */}
        {visibleData.map((item, index) => {
          return (
            <VirtualizeItem
              key={nanoid()}
              index={index}
              cachePosition={cachePosition}
            />
          )
        })}
      </div>
    </div>
  )
}

export default VirtualizedList
