import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ThemeProvider } from './components/themeContext'
import Toggle from './components/Toggle'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <main>
        <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
          <Toggle />
        </div>
        <App />
      </main>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
