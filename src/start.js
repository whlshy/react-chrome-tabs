import React from 'react'
import { render } from 'react-dom'
import App from './components/Tabs.js'

let tabs = [
  { id: 0, favicon: "https://raw.githubusercontent.com/adamschwartz/chrome-tabs/gh-pages/demo/images/google-favicon.ico", title: "Google" },
  { id: 1, favicon: "https://raw.githubusercontent.com/adamschwartz/chrome-tabs/gh-pages/demo/images/facebook-favicon.ico", title: "Facebook" },
  { id: 2, favicon: "https://it108.wke.csie.ncnu.edu.tw/edu.ico", title: "IT Technology" }
]

render(
  <App />
  , document.getElementById('root')
)