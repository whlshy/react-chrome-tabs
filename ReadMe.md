# React Chrome Tabs

React Chrome Tabs 是基於 [adamschwartz](https://github.com/adamschwartz) 的 [chrome-tabs](https://github.com/adamschwartz/chrome-tabs) 的 React 版本

# [Oneline Demo](https://whlshy.github.io/react-chrome-tabs/)

上面連結是 React Chrome Tabs 的基本展示

## Install

#### 必要套件

* `react`: >=16.8.0
* `react-dom`: >=16.8.0
* `prop-types`: ^15.8.1

#### Install React Chrome Tabs

```
npm i react-chrome-tabs --save
```

## Usage

```jsx
import React, { useState } from 'react'
import { render } from 'react-dom'
import ChromeTabs from 'react-chrome-tabs'

let [tabs, setTabs] = useState([
  { key: 0, favicon: "https://raw.githubusercontent.com/adamschwartz/chrome-tabs/gh-pages/demo/images/google-favicon.ico", title: "Google" },
  { key: 1, favicon: "https://raw.githubusercontent.com/adamschwartz/chrome-tabs/gh-pages/demo/images/facebook-favicon.ico", title: "Facebook" },
  { key: 2, favicon: "https://it108.wke.csie.ncnu.edu.tw/edu.ico", title: "IT Technology" }
])

render(
    <ChromeTabs 
      currentTabs={tabs}
      onChange={tabs => setTabs(tabs)}
    />
    , document.getElementById('root')
)
```

## PROPS & METHODS

|Prop name|Type|Default|Description|
|---|---|---|---|
|className|string|||
|dark|bool|`false`||
|defaultCurrent|number|||
|currentTabs|array|`[]`|分頁陣列 e.g. `[{key: "num or str", "favicion": "url", "title": "title"}]`|
|onChange|func|`(tabs) => {}`||
|onClick|func|`(key) => {}`||
|onClose|func|`(key) => {}`||
|style|object|`{}`|| 

# Change Log

## 2.0.0
- defaultTabs => currentTabs
- 內部component不再控制tabs (都由onChange傳到外層變化currentTabs)