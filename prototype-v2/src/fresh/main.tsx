import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App as KonstaApp } from 'konsta/react'
import App from '../App'
import { FreshDesignContext } from './context'
import '../index.css'
import './fresh.css'

document.documentElement.classList.add('fresh-design')

// Share every route, page and provider with the original prototype.
// The comparison entry skips the password presentation used by the original.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FreshDesignContext.Provider value={true}>
      <KonstaApp theme="ios" safeAreas>
        <HashRouter><App /></HashRouter>
      </KonstaApp>
    </FreshDesignContext.Provider>
  </React.StrictMode>,
)
