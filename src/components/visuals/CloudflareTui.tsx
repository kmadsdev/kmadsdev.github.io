/* Cloudflare Dashboard — Textual TUI rendition (private repo, shipped voice).
   JSX/CSS with CSS borders (no box-drawing chars), MacBook screen filler. */

const TABS = ['ZONES', 'DNS', 'ANALYTICS', 'PAGE RULES'];
const ZONES = ['kmads.dev', 'example-zone.com', 'staging.internal'];
const DNS_ROWS = [
  ['A', '@', '104.21.x.x', 'AUTO'],
  ['CNAME', 'www', 'kmads.dev', 'AUTO'],
  ['MX', '@', 'mail.kmads.dev', '3600'],
  ['TXT', '@', 'v=spf1 include:…', '3600'],
];

export default function CloudflareTui() {
  return (
    <div className="cf-tui" role="img" aria-label="Cloudflare dashboard Textual TUI: zones list and DNS records table">
      <div className="cf-tui__tabs">
        {TABS.map((tab, i) => (
          <span key={tab} className={i === 1 ? 'cf-tui__tab is-active' : 'cf-tui__tab'}>
            {tab}
          </span>
        ))}
      </div>
      <div className="cf-tui__body">
        <ul className="cf-tui__zones">
          {ZONES.map((zone, i) => (
            <li key={zone} className={i === 0 ? 'is-active' : ''}>{zone}</li>
          ))}
        </ul>
        <table className="cf-tui__table">
          <thead>
            <tr>
              <th>TYPE</th>
              <th>NAME</th>
              <th>CONTENT</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            {DNS_ROWS.map((row) => (
              <tr key={row.join()}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="cf-tui__keys">Q QUIT · R REFRESH · TAB PANE</footer>
    </div>
  );
}
