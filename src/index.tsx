import { render } from 'react-dom'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@/store'

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
