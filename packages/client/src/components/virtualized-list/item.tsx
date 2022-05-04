import {
  forwardRef,
  useEffect,
  useState,
  type ForwardRefRenderFunction
} from 'react'

interface ItemProps {
  index: number
  cachePosition: (node: Element | null, index: number) => void
}
const VirtualizeItem: ForwardRefRenderFunction<HTMLDivElement, ItemProps> = (
  props,
  ref
) => {
  const { index, cachePosition } = props
  const [node, setNode] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (node) {
      cachePosition(node, index)
    }
  }, [cachePosition, index, node])

  return (
    <div
      className="h-60"
      ref={element => {
        setNode(element)
      }}
    >
      <p>#${index} eligendi voluptatem quisquam</p>
      <p>
        Modi autem fugiat maiores. Doloremque est sed quis qui nobis. Accusamus
        dolorem aspernatur sed rem.
      </p>
    </div>
  )
}

export default forwardRef(VirtualizeItem)
