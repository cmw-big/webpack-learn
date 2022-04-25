import { PartialProps } from '@/typeTools'
import { ComponentProps, ComponentType, FC, useEffect, useState } from 'react'
import { nanoid as getNanoid } from 'nanoid'

interface NanoIdProps {
  nanoid: string
}
type HOC<InjectProps> = <props extends InjectProps>(
  Component: ComponentType<props>
) => ComponentType<PartialProps<props, InjectProps>>

function compose<T1>(hoc1: HOC<T1>): HOC<T1>
function compose<T1, T2>(hoc1: HOC<T1>, hoc2: HOC<T2>): HOC<T1 & T2>
function compose<T1, T2, T3>(
  hoc1: HOC<T1>,
  hoc2: HOC<T2>,
  hoc3: HOC<T3>
): HOC<T1 & T2 & T3>
function compose<T1, T2, T3, T4>(
  hoc1: HOC<T1>,
  hoc2: HOC<T2>,
  hoc3: HOC<T3>,
  hoc4: HOC<T4>
): HOC<T1 & T2 & T3 & T4>
function compose<R>(hoc1: HOC<R>, ...hocList: HOC<any>[]): HOC<R>
function compose<R>(...funcs: HOC<any>[]): HOC<R>

function compose(...hocList: Array<HOC<any>>) {
  // 必须要把c写在第二个参数。因为这里的acc和hoc的类型都是hoc，如果初始化的时候不写的话，那么acc类型可能是ComponentType类型。
  return (c: ComponentType) => hocList.reduce((acc, hoc) => hoc(acc), c)
}
/**
 * 将传入的组件加入一个 nanoid 属性，使用这个组件的时候，就可以在Component的props中直接拿到nanoid属性
 *
 * @param Component 传入的组件
 * @returns 返回一个新的组件
 */
export const withNanoIdHoc: HOC<NanoIdProps> = Component => {
  // 返回的组件，属性只能传递P类型的属性
  return props => {
    const { nanoid: propNanoId, ...restProps } = props
    const [nanoid, setNanoid] = useState(propNanoId)
    useEffect(() => {
      if (!nanoid) {
        setNanoid(getNanoid())
      }
    }, [nanoid])
    if (!nanoid) {
      return null
    }
    const componentsProps = {
      ...restProps,
      nanoid
    } as ComponentProps<typeof Component>
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...componentsProps} />
  }
}
const Test: FC = props => {
  // 可以拿到nanoid
  return <h1>我是test,{132}</h1>
}
const Re = compose(
  withNanoIdHoc,
  withNanoIdHoc,
  withNanoIdHoc,
  withNanoIdHoc,
  withNanoIdHoc
)(Test)

const e = <Re />
class Lifter<InjectProps> {
  public static lift = <T extends object>(hoc: HOC<T>): Lifter<T> =>
    new Lifter([hoc])

  // eslint-disable-next-line no-useless-constructor
  private constructor(private hocList: HOC<any>[]) {
    //
  }

  public lift = <T extends object>(hoc: HOC<T>): Lifter<InjectProps & T> =>
    new Lifter([...this.hocList, hoc])

  public use: HOC<InjectProps> = Component =>
    this.hocList.reduce((acc: ComponentType<any>, hoc) => hoc(acc), Component)
}
const Result = Lifter.lift(withNanoIdHoc)
  .lift(withNanoIdHoc)
  .use(props => {
    return <h1>我是好人</h1>
  })
