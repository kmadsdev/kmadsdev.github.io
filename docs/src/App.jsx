import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      {/* "Cracks" filter */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="cracks"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="10" result="noise" /><feColorMatrix type="luminanceToAlpha" in="noise" result="alphaNoise" /><feComponentTransfer in="alphaNoise" result="plates"><feFuncA type="discrete" tableValues="0 1" /></feComponentTransfer><feConvolveMatrix order="3 3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" in="plates" result="edges"/><feComponentTransfer in="edges" result="invertedEdges"> <feFuncR type="table" tableValues="1 0" /> <feFuncG type="table" tableValues="1 0" /> <feFuncB type="table" tableValues="1 0" /> </feComponentTransfer><feFlood floodColor="#fff" result="bgColor" /><feComposite operator="in" in="bgColor" in2="invertedEdges" /></filter>
      </svg>

      <Header />
      <Hero />
      <About />
      <Experience />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
