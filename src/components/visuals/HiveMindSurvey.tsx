/* HiveMind survey UI rendition (no separate live UI exists) — JSX/CSS,
   fills an iPad .mockup__screen. Classes styled in app.css, tokens only. */

const OPTIONS = [
  { label: 'Under 50 employees', selected: false },
  { label: '50 – 200 employees', selected: true },
  { label: '200 – 1000 employees', selected: false },
  { label: '1000+ employees', selected: false },
];

export default function HiveMindSurvey() {
  return (
    <div className="hm-survey" role="img" aria-label="HiveMind client-potential survey, question 4 of 10">
      <header className="hm-survey__head">
        <span>HIVEMIND — CLIENT POTENTIAL</span>
        <span>Q 4/10</span>
      </header>
      <p className="hm-survey__question">How many employees does the company have?</p>
      <ul className="hm-survey__options">
        {OPTIONS.map((opt) => (
          <li key={opt.label} className={opt.selected ? 'hm-survey__option is-selected' : 'hm-survey__option'}>
            {opt.label}
          </li>
        ))}
      </ul>
      <div className="hm-survey__progress">
        <i style={{ width: '40%' }} />
      </div>
      <span className="hm-survey__next">NEXT</span>
    </div>
  );
}
