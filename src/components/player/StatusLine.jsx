// The status line of the music player: one thin line at the bottom of the screen.
// It shows only what the owner listed: the album icon, the song, the Spotify
// mark (a link to the song) and the button that starts the song again.
// No time, no progress bar, no volume, no hint. With no song it does not render.
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { usePlayer } from './PlayerProvider.jsx';
import { music, usePlayerText } from './playerText.js';

// Icons: 1em high, so they have the height of the text.
const svg = { width: '1em', height: '1em', 'aria-hidden': true, focusable: 'false' };
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square', strokeLinejoin: 'miter' };

/** A record: a generic picture drawn for this site. It is not the cover of the album. */
const DiscIcon = () => (
    <svg viewBox="0 0 16 16" {...svg} {...stroke}>
        <circle cx="8" cy="8" r="6.25" />
        <path d="M8 4.5A3.5 3.5 0 0 1 11.5 8" />
        <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
);

/** The Spotify mark in one colour. The shape is the mark as Spotify publishes it. */
const SpotifyMark = () => (
    <svg viewBox="0 0 24 24" {...svg} fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
);

/** An arrow that turns back to its start. */
const RestartIcon = () => (
    <svg viewBox="0 0 16 16" {...svg} {...stroke}>
        <path d="M2.5 3v3.5H6" />
        <path d="M3 6.5A5.25 5.25 0 1 1 2.75 8.5" />
    </svg>
);

export default function StatusLine() {
    const player = usePlayer();
    const text = usePlayerText();
    const external = useLanguage().t.controls?.external;
    if (!player.enabled) return null;
    const outside = { href: music.spotifyUrl, target: '_blank', rel: 'noopener noreferrer' };
    return (
        <aside className="player-line" aria-label={text.nowPlaying}>
            {/* The same address as the Spotify mark: one stop for the keyboard and one name for a screen reader. */}
            <a className="player-line__control" {...outside} tabIndex={-1} aria-hidden="true"><DiscIcon /></a>
            <p className="player-line__song" translate="no">{music.title} - {music.artist}</p>
            <span className="player-line__rule" aria-hidden="true" />
            <a className="player-line__control" {...outside}>
                <SpotifyMark />
                <span className="visually-hidden">{text.openOnSpotify}{external ? ` (${external})` : ''}</span>
            </a>
            <span className="player-line__rule" aria-hidden="true" />
            <button type="button" className="player-line__control" aria-label={text.restart} onClick={player.restart}>
                <RestartIcon />
            </button>
        </aside>
    );
}
