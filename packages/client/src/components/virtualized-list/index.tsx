/**
 * 虚拟列表组件
 */

import { useState, type FC } from 'react'

const height = 60
const bufferSize = 5

interface VirtualizedListProps {
  scrollWrapDom?: HTMLElement
}

const VirtualizedList: FC<VirtualizedListProps> = props => {
  const { scrollWrapDom } = props
  const [data, setData] = useState(new Array(1000).fill(true))
  //   开始和结束时的index
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

  const updateVisibleData = () => {
    const visibleData = data.slice()
  }

  return (
    <div className="wrapper">
      <div
        style={{
          paddingTop: `${startOffset}px`,
          paddingBottom: `${endOffset}px`
        }}
      >
        {/* 虚拟列表 */}
      </div>
    </div>
  )
}

export default VirtualizedList
