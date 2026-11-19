// "More" section: volunteering, languages, hobbies and future projects.
// One honest line for each hobby. No record, no team, no detail without a source.
import { facts } from '../facts.js';
import { years } from '../format.js';

const { earlier, contact } = facts;
const { reddit } = earlier;

export const more = {
    label: 'More',
    title: 'Volunteering, languages and what I do for fun.',
    lead: 'I like performance engineering in servers, in PC cases and under a car hood.',
    volunteering: {
        anchor: 'more-volunteering',
        title: 'Volunteering',
        role: 'Hardware and IT advisor',
        place: 'Reddit',
        period: years(reddit),
        text: `I helped ${reddit.people} people to design and build PCs for gaming, professional work and servers: part choice, budget and repairs on Windows, macOS and Linux. It was before AI assistants, so each answer came from research, benchmarks and my own builds.`,
        communitiesLabel: 'Communities',
        communities: reddit.communities,
    },
    languages: {
        anchor: 'more-languages',
        title: 'Languages',
        items: [
            { id: 'pt', name: 'Portuguese', level: 'Native' },
            { id: 'en', name: 'English', level: 'C1' },
            { id: 'es', name: 'Spanish', level: 'Basic' },
        ],
    },
    hobbies: {
        anchor: 'more-hobbies',
        title: 'Hobbies',
        items: [
            {
                id: 'ecu',
                title: 'Car ECU tuning',
                text: `I study the engine control units and the tuning of 1990 to 2002 Honda Civics. The notes go to an open archive under my second GitHub account, ${contact.carGithubHandle}.`,
                link: { label: 'open-civic', to: contact.carRepo },
            },
            { id: 'pc', title: 'PC hardware', text: 'I build PCs and homelabs, and I read the benchmarks before I buy a part.', link: null },
            { id: 'gym', title: 'Gym', text: 'I train at the gym.', link: null },
            { id: 'basketball', title: 'Basketball', text: 'I play basketball for fun.', link: null },
            { id: 'running', title: 'Running', text: 'I run.', link: null },
        ],
    },
    future: {
        anchor: 'more-future',
        title: 'Future projects',
        lead: 'Only what my public repositories state as planned.',
        // Same ids and order as facts.future. An empty list hides the block.
        items: [
            { id: 'notes', title: 'Notes: the roadmap', text: 'Offline support with a service worker, a folder view with a file tree, export of the preview to PDF and HTML, and snippets shared through the URL.' },
            { id: 'microdoom', title: 'MicroDOOM v1.1', text: 'The next version of my own Doom-like game in plain JavaScript. Its README marks it as work in progress.' },
        ],
    },
};
