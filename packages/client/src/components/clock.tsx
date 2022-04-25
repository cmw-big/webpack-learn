import { nanoid } from 'nanoid'
import { FC } from 'react'

interface IProps {
  count: number
}

const clock: FC<IProps> = props => {
  return <div>{props.count}</div>
}

export default clock
