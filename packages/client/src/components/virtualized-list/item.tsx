import { CSSProperties, type FC } from 'react'

export interface VirtualizeItemProps {
  index?: number
  className?: string
  style?: CSSProperties
}

const VirtualizeItem: FC<VirtualizeItemProps> = props => {
  const { index = 0, className = '', style } = props
  return (
    <li className={`h-100 absolute  ${className}`} style={style}>
      <p>#${index} eligendi voluptatem quisquam</p>
      <p>
        Modi autem fugiat maiores. Doloremque est sed quis qui nobis. Accusamus
        dolorem aspernatur sed rem.
      </p>
    </li>
  )
}

export default VirtualizeItem
