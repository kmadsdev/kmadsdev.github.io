// Drawings of the introduction, part B. Keys are the `art` ids of facts.art
// (clouds, coldStart, pipeline, sitePipeline, timeline). Owner: intro agent B.
// Each value is a component with no props. It reads facts.art.<key> and t.intro.art.<key>.
import Clouds from '../art/Clouds.jsx';
import ColdStart from '../art/ColdStart.jsx';
import Pipeline from '../art/Pipeline.jsx';
import SitePipeline from '../art/SitePipeline.jsx';
import Timeline from '../art/Timeline.jsx';

export const artB = {
    clouds: Clouds,
    coldStart: ColdStart,
    pipeline: Pipeline,
    sitePipeline: SitePipeline,
    timeline: Timeline,
};
