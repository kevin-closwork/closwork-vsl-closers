import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import OrganizationJsonLd from './components/OrganizationJsonLd.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OrganizationJsonLd />
    <App />
  </React.StrictMode>,
)
