// CI/CD chapter: "My personal default CI/CD workflow", from art.defaultWorkflow
// (contents.global.js) and the six ordered steps of each flow (t.intro.art.defaultWorkflow).
// The same rail as the deploy job of consignado-api (Pipeline.jsx), in the same hand:
// QA first, then PRODUCTION, one station for each step. The commit is the packet. The rail
// returns from the end of QA to the start of PRODUCTION, because a change goes to QA first.
// Wide box: one row of six stations per flow. Medium box: three per row. Narrow box: top to bottom.
// Still picture: the deploy to production runs, everything before it is done.
import { useRef } from 'react';
import { art } from '../../content/index.js';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { Art } from './kit/index.js';
import { useUnits } from './artBKit.jsx';
import { Scene, build } from './Pipeline.jsx';

export default function DefaultWorkflow() {
    const text = useLanguage().t.intro.art.defaultWorkflow;
    const { flows } = art.defaultWorkflow;
    const box = useRef(null);
    const W = useUnits(box, { max: 1120 });
    const items = flows.flatMap((flow) => text.flows[flow.id].steps.map((label, i) => ({ id: `${flow.id}-${i}`, label })));
    const heads = {};
    let at = 0;
    for (const flow of flows) {
        heads[at] = text.flows[flow.id].label;
        at += text.flows[flow.id].steps.length;
    }
    const perFlow = text.flows[flows[0].id].steps.length;
    const cols = W >= 760 ? perFlow : W >= 440 ? Math.ceil(perFlow / 2) : 0;
    const layout = build(W, items, cols, { heads });
    // The deploy step of the last flow.
    const rest = items.length - 3;
    return (
        <div ref={box} className="artb">
            <Art label={text.summary} width={layout.width} height={layout.height}>
                <Scene layout={layout} rest={rest} />
            </Art>
        </div>
    );
}
