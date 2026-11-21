// Drawings of the introduction, part B. Keys are the `art` ids of `art` in contents.global.js
// (clouds, coldStart, pipeline, defaultWorkflow, timeline).
// Each value is a component with no props. It reads art.<key> and t.intro.art.<key>.
import Clouds from '../art/Clouds.jsx';
import ColdStart from '../art/ColdStart.jsx';
import DefaultWorkflow from '../art/DefaultWorkflow.jsx';
import Pipeline from '../art/Pipeline.jsx';
import Timeline from '../art/Timeline.jsx';

export const artB = {
    clouds: Clouds,
    coldStart: ColdStart,
    pipeline: Pipeline,
    defaultWorkflow: DefaultWorkflow,
    timeline: Timeline,
};
