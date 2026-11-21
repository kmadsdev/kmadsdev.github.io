// Drawings of the introduction, part A. Keys are the `art` ids of `art` in contents.global.js
// (requestPath, trace, contractStates, margin).
// Each value is a component with no props: it reads art.<key> and its labels from t.intro.art.<key>.
import ContractStates from '../art/ContractStates.jsx';
import Margin from '../art/Margin.jsx';
import RequestPath from '../art/RequestPath.jsx';
import Trace from '../art/Trace.jsx';

export const artA = {
    requestPath: RequestPath,
    trace: Trace,
    contractStates: ContractStates,
    margin: Margin,
};
