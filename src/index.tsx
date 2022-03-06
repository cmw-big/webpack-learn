import React, { useState } from 'react'
import { render } from 'react-dom'

function App() {
  const [count, setCount] = useState(0)
  const handleIncrease = () => {
    setCount(count + 1)
  }
  return <div onClick={handleIncrease}>{count}</div>
}

render(<App />, document.getElementById('root'))

console.log(process.env.NODE_ENV)
