import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectsPage from './ProjectsPage.jsx';
import Lenis from 'lenis';
import './styles/global.css';
import './styles/mobile.css';


const lenis = new Lenis({
    lerp: 0.055,
    smooth: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 0.5,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ProjectsPage />
    </React.StrictMode>,
);
