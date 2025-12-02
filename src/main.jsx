import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectsPage from './ProjectsPage';

import Lenis from 'lenis';
import './styles/global.css'
import './styles/mobile.css'


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
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  </BrowserRouter>
)
