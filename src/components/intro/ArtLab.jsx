// Review page for the drawings: open the site with ?artlab=1. TEMPORARY: the
// coordinator removes it before the pull request.
import { artA } from './artA.js';
import { artB } from './artB.js';

export default function ArtLab() {
    const all = { ...artA, ...artB };
    return (
        <section id="artlab" style={{ paddingBlock: '6rem', display: 'grid', gap: '3rem' }}>
            {Object.entries(all).map(([id, Drawing]) => (
                <div key={id} data-art={id} style={{ display: 'grid', gap: '0.75rem' }}>
                    <p className="wh-label">{id}</p>
                    <div style={{ maxWidth: '44rem' }}><Drawing /></div>
                    <div style={{ maxWidth: '24rem' }}><Drawing /></div>
                </div>
            ))}
        </section>
    );
}
