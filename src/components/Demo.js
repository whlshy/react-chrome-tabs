import React, { useState, useEffect } from 'react'
import Tabs from './Tabs'
import '../style/Demo.css'

export default function Demo(props) {
  const [tabs, setTabs] = useState([
    { key: 0, favicon: "https://www.google.com/favicon.ico", title: "Google" },
    { key: 1, favicon: "https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico", title: "Facebook" },
    { key: 2, favicon: "https://it108.wke.csie.ncnu.edu.tw/edu.ico", title: "IT Technology" }
  ])
  const [dark, setDark] = useState(false)
  const [key, setID] = useState(2)
  const [current, setCurrent] = useState(0)

  const addTab = (isCurrent) => {
    let tab = [{ key: key + 1, title: "New Tab" }]
    let tmpTabs = tabs.concat(tab);
    !!isCurrent && setCurrent(key + 1)
    setID(key + 1)
    setTabs(tmpTabs)
  }

  const onClose = (key) => {
    let tmpTabs = tabs.filter(f => f.key !== key);
    let idx = null; 
    tabs.forEach((f, index) => f.key === current && (idx = index))
    let isCurrent = tmpTabs.filter(f => f.key === current).length > 0 ? true : false;
    let tmpCurrent = tmpTabs.length > 0 ? (tmpTabs[idx] ? tmpTabs[idx].key : tmpTabs[tmpTabs.length - 1].key) : null;
    !isCurrent && setCurrent(tmpCurrent)
    setTabs(tmpTabs)
  }


  return (
    <div className={`root ${!dark ? "" : " dark-theme"}`}>
      <div className='surface'>
        <div className="mock-browser">
          <Tabs
            defaultTabs={tabs}
            dark={dark}
            defaultCurrent={current}
            onClick={key => setCurrent(key)}
            onClose={key => onClose(key)}
          />
          <div className="chrome-tabs-optional-shadow-below-bottom-bar"></div>
          <div className="mock-browser-content">
            <div className="buttons">
              <button onClick={e => setDark(!dark)} data-theme-toggle>Toggle dark theme</button>
              <button onClick={e => addTab(true)} data-add-tab>Add new tab</button>
              <button onClick={e => addTab()} data-add-background-tab>Add tab in the background</button>
              <button onClick={e => onClose(current)} data-remove-tab>Remove active tab</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
