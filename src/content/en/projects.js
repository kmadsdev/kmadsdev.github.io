// "Projects" section. Names, links and stacks are in facts.js (facts.projects).
// One item per id of facts.projectOrder, in the same order.
import { facts } from '../facts.js';

const p = facts.projects;

export const projects = {
    label: 'Projects',
    title: 'Things I built and left running.',
    intro: 'Open the live ones. Read the code of the public ones.',
    live: 'Open live',
    source: 'Source code',
    privateRepo: 'Private repository',
    stack: 'Stack',
    items: [
        {
            id: 'notes',
            tagline: 'A code editor in one HTML file',
            text: `A notepad that looks and works like VS Code, with no backend and no account. Monaco highlights ${p.notes.languages} languages. Files stay in the browser, or save straight to your disk in Chrome and Edge. It has ${p.notes.previews} live previews, from Markdown to Mermaid.`,
        },
        {
            id: 'diabetes',
            tagline: 'A risk estimate from 17 answers',
            text: `A FastAPI service validates ${p.diabetes.inputs} inputs, loads the newest scikit-learn model and returns a risk estimate with its confidence. The model is a Random Forest trained on public Kaggle data. It was my CS50x final project. It is not a medical diagnosis.`,
        },
        {
            id: 'offmode',
            tagline: 'A Pomodoro timer that remembers',
            text: 'A focus timer for the web and the desktop. It tracks your focus time across sessions, with login and sync to a server.',
        },
        {
            id: 'doom',
            tagline: 'Doom in one file, with no server',
            text: `The 1993 game compiled from C to WebAssembly, packed with gzip into a single HTML file that unpacks itself in the browser. The packed game went from ${p.doom.sizeBefore} to ${p.doom.sizeAfter}. I built it to study compression.`,
        },
        {
            id: 'overclock',
            tagline: 'A scoreboard for my own life',
            text: `A personal performance system: ${p.overclock.attributes} attributes in ${p.overclock.pillars} pillars, each scored from 0 to 100 by a written formula. A missing value is unknown, not zero. The web app and the Android app share one PostgreSQL database.`,
        },
        {
            id: 'burnrate',
            tagline: 'Where the money for AI and cloud goes',
            text: 'A finance tracker for an engineer: AI, cloud and tool costs in one place. It imports bank data through Open Finance Brasil and reads cloud costs from Ruph. I drew the charts in SVG by hand.',
        },
        {
            id: 'agentic',
            tagline: 'One context for every AI coding agent',
            text: 'A template for a repository that AI agents can work in: task, progress and knowledge files, test-first rules, and a fixed set of MCP servers and skills.',
        },
        {
            id: 'devops-challenge',
            tagline: 'Four containers, one command',
            text: `A distributed system on Docker Compose with ${p['devops-challenge'].containers} containers: a Python writer, a Go reader, a Node.js web front end and Redis between them.`,
        },
        {
            id: 'incident-api',
            tagline: 'Alerts and incidents, with a terminal UI',
            text: 'An alert and incident service in PHP (Hyperf, Swoole) that ingests metrics and stores them in MySQL and Redis. It comes with a terminal interface in Python.',
        },
        {
            id: 'custom-square',
            tagline: 'A CSS playground',
            text: 'Change CSS properties, gradients and colors and see the result at once. Plain JavaScript, with the theme saved in the browser.',
        },
        {
            id: 'trocatine',
            tagline: 'The landing page of my first startup',
            text: 'The public page of TrocaTine, an exchange of children\'s clothes and toys. I led the two-person frontend team that built it.',
        },
        {
            id: 'student-tools',
            tagline: 'Free tools for engineering students',
            text: 'A curated list of the free developer tools and credits in the GitHub Student Developer Pack. A contribution to the community, not code.',
        },
    ],
};
