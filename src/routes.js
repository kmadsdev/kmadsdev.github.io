// One extra address: /projects shows this page at the "Applications" section.
// A click on a link to /projects moves there with no reload.
// The address and the section: links.projectsPath and links.projectsSection in contents.global.js.
import { useEffect } from 'react';
import { links } from './content/contents.global.js';
import { goTo } from './smooth.js';

export const PROJECTS_PATH = links.projectsPath;
export const PROJECTS_SECTION = links.projectsSection;
const TARGET = PROJECTS_SECTION;

const isProjectsPath = (pathname) => [PROJECTS_PATH, `${PROJECTS_PATH}.html`, `${PROJECTS_PATH}/`].includes(pathname);

function showApplications() {
    goTo(document.getElementById(TARGET));
}

/** Click handler for a link whose href is /projects. Modified clicks keep the browser default. */
export function openProjects(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!isProjectsPath(window.location.pathname) || window.location.hash) {
        window.history.pushState(null, '', PROJECTS_PATH);
    }
    showApplications();
}

/** On a direct visit to /projects, and on back or forward to it, go to the section. */
export function useProjectsPath() {
    useEffect(() => {
        const sync = () => {
            if (isProjectsPath(window.location.pathname) && !window.location.hash) showApplications();
        };
        // Two frames: the sections must have their height before the scroll.
        const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(sync));
        window.addEventListener('popstate', sync);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('popstate', sync);
        };
    }, []);
}
