import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const redirectPath = new URLSearchParams(window.location.search).get('redirect')

if (redirectPath) {
  const cleanPath = redirectPath.replace(/^\/+/, '')
  window.history.replaceState(null, '', `${import.meta.env.BASE_URL}${cleanPath}`)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
