import { PartialProps } from '@/typing/operation'
import { nanoid } from 'nanoid'
import { ComponentType, FC, useEffect, useState } from 'react'

export interface NanoIdProps {
  nanoId: string
}

export function WithNanoIdHoc<P extends NanoIdProps>(
  Component: ComponentType<P>
): FC<PartialProps<P, NanoIdProps>> {
  return function WidthNanoId(props) {
    const { nanoId: propsNanoId, ...propsWithoutNanoId } = props
    const [nanoId, setNanoId] = useState(propsNanoId)
    useEffect(() => {
      if (!nanoId) {
        setNanoId(nanoid())
      }
    }, [nanoId])
    if (!nanoId) {
      return null
    }
    // 这里一通操作不行了:疑问
    const propsWithNanoId = { ...propsWithoutNanoId, nanoId } as P
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...propsWithNanoId} />
  }
}

const Test: FC = props => {
  return <h1>我是App</h1>
}
const result = WithNanoIdHoc(Test)
