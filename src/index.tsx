import React from 'react'
import { render } from 'react-dom'
render(<h1>hello</h1>, document.getElementById('root'))

function test(): ClassDecorator {
  return target => {
    console.log(target)
  }
}

@test()
class Person {}

const p = new Person()
const 程明旺 = 1

const a = 1
