import { LanguageProvider, useLanguage } from './i18n/LanguageProvider.jsx';
import { ThemeProvider } from './theme/ThemeProvider.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Cases from './components/Cases.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function Page() {
    const { t } = useLanguage();
    return (
        <>
            <a className="skip-link" href="#main">{t.nav.skip}</a>
            <Header />
            <main id="main">
                <Hero />
                <About />
                <Experience />
                <Cases />
                <Projects />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <Page />
            </LanguageProvider>
        </ThemeProvider>
    );
}
