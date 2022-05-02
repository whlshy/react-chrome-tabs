import React from 'react'
import { render } from 'react-dom'
import App from './components/Tabs.js'

let tabs = [
  { id: 0, favicon: "https://www.google.com/favicon.ico", title: "Google" },
  { id: 1, favicon: "https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico", title: "Facebook" },
  { id: 2, favicon: "https://it108.wke.csie.ncnu.edu.tw/edu.ico", title: "IT Technology" }
]

render(
  <App defaultTabs={tabs} />
  , document.getElementById('root')
)