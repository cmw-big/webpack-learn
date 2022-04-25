import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import store from '@/store'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import App from './App'

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
