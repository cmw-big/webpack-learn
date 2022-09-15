import { compareVersion } from '@mono/common'
import { type FC } from 'react'

const App: FC = props => {
  return <div />
}
export default App

const result = compareVersion('1.01', '1.001')
console.log(result)
