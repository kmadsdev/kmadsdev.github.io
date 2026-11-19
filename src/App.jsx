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


function Page() {
    const { t } = useLanguage();
    useSmoothScroll();
    useProjectsPath();
    return (
        <>
            <a className="skip-link" href={links.main}>{t.nav.skip}</a>
            <Rulers />
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
