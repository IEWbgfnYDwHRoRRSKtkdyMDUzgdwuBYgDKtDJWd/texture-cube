import 'babel-polyfill'
import THREE from 'three'
import App from './containers/app.react'
import React from 'react'
import ReactDOM from 'react-dom'

THREE.Cache.enabled = true

window.onload = function(){
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
}
