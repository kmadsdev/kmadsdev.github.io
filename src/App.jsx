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
import { useProjectsPath } from './routes.js';
import { useSmoothScroll } from './smooth.js';
import { links } from './content/index.js';
import { PlayerProvider } from './components/player/PlayerProvider.jsx';
import StatusLine from './components/player/StatusLine.jsx';


function Page() {
    const { t } = useLanguage();
    useSmoothScroll();
    useProjectsPath();
    return (
        <>
            <a className="skip-link" href={links.main}>{t.nav.skip}</a>
            <Header />
            <div className="page">
                <main id="main">
                    <Hero />
                    <Intro />
                    <Experience />
                    <Education />
                    <Applications />
                    <More />
                    <Contact />
                </main>
                <Footer />
            </div>
            {/* After the page in the tab order: the scroll ruler, then the status line of the music. */}
            <Rulers />
            <StatusLine />
        </>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <PlayerProvider>
                <Page />
            </PlayerProvider>
        </LanguageProvider>
    );
}
