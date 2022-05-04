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
  const [id, setID] = useState(2)
  const [current, setCurrent] = useState(0)

  const addTab = (isCurrent) => {
    let tab = [{ id: id + 1, title: "New Tab" }]
    let tmpTabs = tabs.concat(tab);
    !!isCurrent && setCurrent(id + 1)
    setID(id + 1)
    setTabs(tmpTabs)
  }

  const onClose = (id) => {
    let tmpTabs = tabs.filter(f => f.id !== id);
    let idx = null; 
    tabs.forEach((f, index) => f.id === current && (idx = index))
    let isCurrent = tmpTabs.filter(f => f.id === current).length > 0 ? true : false;
    let tmpCurrent = tmpTabs.length > 0 ? (tmpTabs[idx] ? tmpTabs[idx].id : tmpTabs[tmpTabs.length - 1].id) : null;
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
            onClick={id => setCurrent(id)}
            onClose={id => onClose(id)}
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
