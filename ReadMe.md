# React Chrome Tabs

React Chrome Tabs 是基於 [adamschwartz](https://github.com/adamschwartz) 的 [chrome-tabs](https://github.com/adamschwartz/chrome-tabs) 的 React 版本

# [Oneline Demo](https://whlshy.github.io/react-chrome-tabs/)

上面連結是 React Chrome Tabs 的基本展示

## Install

```
npm i react-chrome-tabs --save
```

## Usage

```jsx
import React from 'react'
import { render } from 'react-dom'
import ChromeTabs from 'react-chrome-tabs'

let tabs = [
  { id: 0, favicon: "https://raw.githubusercontent.com/adamschwartz/chrome-tabs/gh-pages/demo/images/google-favicon.ico", title: "Google" },
  { id: 1, favicon: "https://raw.githubusercontent.com/adamschwartz/chrome-tabs/gh-pages/demo/images/facebook-favicon.ico", title: "Facebook" },
  { id: 2, favicon: "https://it108.wke.csie.ncnu.edu.tw/edu.ico", title: "IT Technology" }
]

render(
    <ChromeTabs 
      defaultTabs={tabs}
      onChange={tabs => console.log(tabs)}
    />
    , document.getElementById('root')
)
```

## PROPS & METHODS

|Prop name|Type|Default|Description|
|---|---|---|---|
|className|string|||
|dark|bool|`false`||
|defaultCurrent|string|||
|defaultTabs|array|`[]`|分頁陣列 e.g. `[{"favicion": "url", "title": "title"}]`|
|onChange|func|`(tabs) => {}`||
|onClick|func|`(id) => {}`||
|onClose|func|`(id) => {}`||
|style|object|`{}`|| 