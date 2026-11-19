import { LanguageProvider, useLanguage } from './i18n/LanguageProvider.jsx';
import Rulers from './components/Rulers.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Intro from './components/Intro.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Applications from './components/Applications.jsx';
import More from './components/More.jsx';
import { Contact, Footer } from './components/Outro.jsx';
import ArtLab from './components/intro/ArtLab.jsx';

// TEMPORARY review switch: ?artlab=1 shows only the drawings.
const artLab = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('artlab');

function Page() {
    const { t } = useLanguage();
    return (
        <>
            <a className="skip-link" href="#main">{t.nav.skip}</a>
            <Rulers />
            <Header />
            <div className="page">
                <main id="main">
                    {artLab ? <ArtLab /> : (
                        <>
                            <Hero />
                            <Intro />
                            <Experience />
                            <Education />
                            <Applications />
                            <More />
                            <Contact />
                        </>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <Page />
        </LanguageProvider>
    );
}
