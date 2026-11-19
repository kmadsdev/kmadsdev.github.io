// One extra address: /projects shows this page at the "Applications" section.
// A click on a link to /projects moves there with no reload.
import { useEffect } from 'react';

export const PROJECTS_PATH = '/projects';
const TARGET = 'applications';

const isProjectsPath = (pathname) => /^\/projects(\.html|\/)?$/.test(pathname);

function showApplications() {
    document.getElementById(TARGET)?.scrollIntoView();
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
