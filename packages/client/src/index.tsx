import { render } from 'react-dom'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import App from './App'
import './index.css'

render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)

const enum test {
  name = 'cmw1'
}
console.log(test.name, '好人啊')
