// Flowchart of one case file. The step list is the text form of the chart:
// each step names the two nodes of one edge.

export default function Flow({ caseId, structure, text, stepLabel }) {
    return (
        <figure className="flow" data-flow={caseId}>
            <figcaption className="flow-title">{text.title}</figcaption>
            <ol className="flow-steps">
                {structure.edges.map(([from, to], i) => (
                    <li className="flow-step" key={`${from}-${to}-${i}`}>
                        <span className="flow-step-index">
                            <span className="visually-hidden">{stepLabel} </span>
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flow-step-route">
                            <span className="flow-node-name">{text.nodes[from]}</span>
                            <span aria-hidden="true"> → </span>
                            <span className="visually-hidden"> &gt; </span>
                            <span className="flow-node-name">{text.nodes[to]}</span>
                        </span>
                        <span className="flow-step-text">{text.steps[i]}</span>
                    </li>
                ))}
            </ol>
        </figure>
    );
}
