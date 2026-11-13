// Page title, navigation, footer and the 404 page.
import { facts } from '../facts.js';

export const meta = {
    htmlLang: 'en',
    ogLocale: 'en_US',
    title: `${facts.person.name} (${facts.person.alias}) · Backend Software Engineer`,
    description: `Backend Software Engineer at ${facts.picpay.name}. Java, Go, Python, PHP, SQL and MongoDB. Case files with architecture flowcharts, projects in production and the full experience record.`,
};

export const nav = {
    skip: 'Skip to content',
    home: 'Back to the top',
    menu: 'Sections',
    items: [
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'cases', label: 'Case files' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' },
    ],
    language: 'Language',
    languages: { en: 'English', pt: 'Portuguese' },
};

export const footer = {
    line: `Designed and built by ${facts.person.name}.`,
    source: 'Source code of this site',
    license: 'Code under the MIT license. Texts and images are mine.',
    top: 'Back to the top',
};

export const notFound = {
    title: 'This page does not exist',
    text: 'The address is wrong, or the page moved. The portfolio is one page, and it starts here:',
    cta: 'Open the portfolio',
};
