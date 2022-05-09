import { FC } from 'react'

export interface VirtualizeItemProps {
  index?: number
}

const VirtualizeItem: FC<VirtualizeItemProps> = props => {
  const { index = 0 } = props
  return (
    <li className="h-100">
      <p>#${index} eligendi voluptatem quisquam</p>
      <p>
        Modi autem fugiat maiores. Doloremque est sed quis qui nobis. Accusamus
        dolorem aspernatur sed rem.
      </p>
    </li>
  )
}

export default VirtualizeItem
