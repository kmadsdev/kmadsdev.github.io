// The status line of the music player: one line of small text under the badge, in the hero.
// Left to right, and nothing else: the album cover and the song name (one link to the song on Spotify),
// the speaker with the volume slider, the button that starts the song again.
// No time, no progress bar, no hint, no divider. With no song it does not render.
// The same line shows in the top bar after the hero is out of view (`bar`): there it has a
// play and pause button at its left, because the globe is not on the screen.
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { usePlayer } from './PlayerProvider.jsx';
import { music, usePlayerText } from './playerText.js';

// Icons: 1em high, so they have the height of the text. 16px grid, round ends. The stroke is 2 units:
// as heavy as the strokes of the semibold text beside them.
const svg = { viewBox: '0 0 16 16', width: '1em', height: '1em', 'aria-hidden': true, focusable: 'false', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

/** A speaker. With sound: two waves (one when it is low). Muted: a cross. */
const SpeakerIcon = ({ level }) => (
    <svg {...svg}>
        <path d="M2.5 6.25h2L8 3.5v9L4.5 9.75h-2z" />
        {level === 0 ? <path d="M10.75 6.25l3 3.5M13.75 6.25l-3 3.5" /> : null}
        {level > 0 ? <path d="M10.5 6.25a2.5 2.5 0 0 1 0 3.5" /> : null}
        {level > 0.5 ? <path d="M12.25 4.5a5 5 0 0 1 0 7" /> : null}
    </svg>
);

/** An arrow that turns back to its start. */
const RestartIcon = () => (
    <svg {...svg}>
        <path d="M2.5 3v3.5H6" />
        <path d="M3 6.5A5.25 5.25 0 1 1 2.75 8.5" />
    </svg>
);

const PlayIcon = () => <svg {...svg}><path d="M4.5 3l8 5l-8 5z" fill="currentColor" /></svg>;
const PauseIcon = () => <svg {...svg}><path d="M5 3.25v9.5M11 3.25v9.5" strokeWidth="2.6" /></svg>;

export default function StatusLine({ bar = false }) {
    const player = usePlayer();
    const text = usePlayerText();
    const external = useLanguage().t.controls?.external;
    if (!player.enabled) return null;
    const percent = Math.round(player.volume * 100);
    return (
        <div className={bar ? 'player-line player-line--bar' : 'player-line'} role="group" aria-label={text.nowPlaying}>
            {bar ? (
                <button type="button" className="player-line__control player-line__play" aria-label={player.playing ? text.pause : text.play} aria-pressed={player.playing} onClick={player.toggle}>
                    {player.playing ? <PauseIcon /> : <PlayIcon />}
                </button>
            ) : null}
            {/* One link: the album cover and the song name go to the song on Spotify. Its name for a screen reader is the label. */}
            <a className="player-line__source" href={music.spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${text.openOnSpotify}${external ? ` (${external})` : ''}`}>
                {/* The cover of the album (96 x 96 file, shown at the height of the line). */}
                <img src={music.cover} alt="" width="96" height="96" decoding="async" draggable="false" />
                <span className="player-line__song" translate="no">{music.title} - {music.artist}</span>
            </a>
            <div className="player-line__group">
                <button type="button" className="player-line__control" aria-label={player.muted ? text.unmute : text.mute} onClick={player.toggleMute}>
                    <SpeakerIcon level={player.volume} />
                </button>
                <input
                    className="player-line__volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={player.volume}
                    aria-label={text.volume}
                    aria-valuetext={`${percent}%`}
                    style={{ '--fill': `${percent}%` }}
                    onChange={(event) => player.setVolume(event.target.value)}
                />
            </div>
            <button type="button" className="player-line__control player-line__restart" aria-label={text.restart} onClick={player.restart}>
                <RestartIcon />
            </button>
        </div>
    );
}
