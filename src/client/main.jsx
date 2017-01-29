import React from 'react'
import block from 'bem-cn'
import { render } from 'react-dom'
import App from './components/app'
import './main.styl'
import 'whatwg-fetch'

block.setup({
    el: '__',
    mod: '--',
    modValue: '-',
})

render(
    <App />,
    document.getElementById('app'),
)
