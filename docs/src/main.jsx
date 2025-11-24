import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import Lenis from 'lenis';

const lenis = new Lenis({
  lerp: 0.055,
  smooth: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 0.5  
});

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
