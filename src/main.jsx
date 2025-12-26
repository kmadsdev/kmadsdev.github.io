import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectsPage from './ProjectsPage';
import { LenisProvider } from './hooks/useLenis.jsx';

import './styles/global.css'
import './styles/mobile.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <LenisProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </LenisProvider>
  </BrowserRouter>
)
