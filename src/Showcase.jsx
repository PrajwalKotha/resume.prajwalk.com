// Four interactive ways to explore the career. A random one opens on each
// page load; the tab strip switches between them.
import { useEffect, useMemo, useRef, useState } from 'react';
import { CERTIFICATIONS, EXPERIENCE, PROFILE, STATS } from './data';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// JSON → highlighted HTML. Input is our own static data, escaped before tagging.
function jsonHtml(obj, fresh = new Set()) {
  return esc(JSON.stringify(obj, null, 2)).replace(
    /("(?:[^"\\]|\\.)*")(\s*:)?|\b(-?\d+(?:\.\d+)?|true|false|null)\b/g,
    (m, str, colon, num) => {
      if (str && colon) return `<span class="jk${fresh.has(str.slice(1, -1)) ? ' new' : ''}">${str}</span>${colon}`;
      if (str) return `<span class="js">${str}</span>`;
      return `<span class="jn">${num}</span>`;
    }
  );
}

const Json = ({ value, fresh, className = '' }) => (
  <pre className={`json ${className}`} dangerouslySetInnerHTML={{ __html: jsonHtml(value, fresh) }} />
);

// Compact career model shared by the concepts, derived from data.js.
const ROLES = EXPERIENCE.map((j) => {
  const [from, to] = j.period.split('–').map((s) => s.trim());
  return {
    role: j.role.split(' - ')[0],
    org: j.org,
    from: +from.slice(-4),
    to: to === 'Present' ? null : +to.slice(-4),
    highlights: j.bullets.slice(0, 3).map(([label]) => label),
  };
});
const CERT_NAMES = CERTIFICATIONS.map((c) => c.name);

/* =================== 1. Integration map =================== */

const COLS = [
  { x: 625, t: 'SYSTEMS' },
  { x: 840, t: 'SYSTEM APIs' },
  { x: 1040, t: 'PROCESS APIs' },
  { x: 1230, t: 'EXPERIENCE APIs' },
  { x: 1370, t: 'CONSUMERS' },
];
// id, label, column, year it joined the estate
const NODES = [
  ['sf', 'Salesforce orgs', 0, 2017], ['ds', 'DocuSign', 0, 2017], ['sftp', 'SFTP', 0, 2017],
  ['snow', 'ServiceNow', 0, 2020], ['cvent', 'Cvent', 0, 2020], ['mdm', 'MDM', 0, 2020],
  ['sp', 'SharePoint', 0, 2022], ['dc', 'Data Cloud', 0, 2025],
  ['s-sf', 'salesforce-sapi', 1, 2017], ['s-files', 'files-sapi', 1, 2017],
  ['s-partner', 'partner-sapi', 1, 2020], ['s-mdm', 'mdm-sapi', 1, 2020],
  ['p-orch', 'orchestration-papi', 2, 2020], ['p-migrate', 'org-migration-papi', 2, 2022],
  ['p-sync', 'realtime-sync-papi', 2, 2022],
  ['e-partner', 'partners-eapi', 3, 2020], ['e-agent', 'agentforce-eapi', 3, 2025],
  ['e-portal', 'owner-portal-eapi', 3, 2026],
  ['c-tableau', 'Tableau', 4, 2022], ['c-att', 'AT&T', 4, 2025], ['c-concerto', 'Concerto', 4, 2025],
  ['c-agent', 'Agentforce', 4, 2025], ['c-portal', 'Owner Portal', 4, 2026],
];
const EDGES = [
  ['sf', 's-sf'], ['dc', 's-sf'], ['ds', 's-files'], ['sftp', 's-files'], ['sp', 's-files'],
  ['snow', 's-partner'], ['cvent', 's-partner'], ['mdm', 's-mdm'],
  ['s-sf', 'p-migrate'], ['s-sf', 'p-sync'], ['s-files', 'p-migrate'], ['s-partner', 'p-orch'],
  ['s-mdm', 'p-sync'], ['s-mdm', 'p-orch'],
  ['p-orch', 'e-partner'], ['p-sync', 'e-partner'], ['p-sync', 'e-agent'], ['p-migrate', 'e-portal'],
  ['p-orch', 'e-portal'],
  ['e-partner', 'c-tableau'], ['e-partner', 'c-att'], ['e-partner', 'c-concerto'],
  ['e-agent', 'c-agent'], ['e-portal', 'c-portal'],
];
const MILESTONE = {
  2017: 'Assistant System Engineer, TCS', 2018: 'Assistant System Engineer, TCS',
  2019: 'Systems Engineer, TCS', 2020: 'Senior Analyst, Accenture · IHG',
  2021: 'Team Lead, Accenture · IHG', 2022: 'Team Lead, Accenture · IHG',
  2023: 'Team Lead, Accenture · IHG', 2024: 'Team Lead, Accenture · IHG',
  2025: 'MuleSoft Architect, IPS · IHG', 2026: 'Lead Engineer, IHG',
};
const MAP_TOP = 110;
const MAP_BOTTOM = 720;
const POS = {};
const YEAR = {};
COLS.forEach((c, ci) => {
  const list = NODES.filter((n) => n[2] === ci);
  const step = (MAP_BOTTOM - MAP_TOP) / list.length;
  list.forEach(([id, , , year], i) => {
    POS[id] = { x: c.x, y: MAP_TOP + step * (i + 0.5) };
    YEAR[id] = year;
  });
});

function IntegrationMap() {
  const [year, setYear] = useState(2026);
  return (
    <>
      <div className="map-hero">
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMaxYMid meet" aria-hidden="true" focusable="false">
          <defs>
            <pattern id="map-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgb(var(--line))" />
            </pattern>
          </defs>
          <rect width="1440" height="760" fill="url(#map-dots)" />
          {COLS.map((c) => (
            <text key={c.t} x={c.x} y={MAP_TOP - 45} textAnchor="middle" className="map-col">{c.t}</text>
          ))}
          {EDGES.map(([a, b], i) => {
            const p = POS[a], q = POS[b], mx = (p.x + q.x) / 2;
            const on = YEAR[a] <= year && YEAR[b] <= year;
            return (
              <g key={i}>
                <path id={`edge-${i}`} d={`M${p.x} ${p.y} C${mx} ${p.y} ${mx} ${q.y} ${q.x} ${q.y}`} className={`edge ${on ? 'on' : 'off'}`} />
                {[0, 1].map((k) => (
                  <g key={k} className={`pulse ${on ? '' : 'off'}`}>
                    <circle r="11" fill="rgb(var(--live))" opacity="0.22" />
                    <circle r="4.5" fill="rgb(var(--live))" />
                    <animateMotion dur={`${2.8 + (i % 5) * 0.6}s`} begin={`${(i * 0.37 + k * 1.7) % 4}s`} repeatCount="indefinite">
                      <mpath href={`#edge-${i}`} />
                    </animateMotion>
                  </g>
                ))}
              </g>
            );
          })}
          {NODES.map(([id, label, col]) => {
            const { x, y } = POS[id];
            const off = YEAR[id] > year ? ' off' : '';
            if (col >= 1 && col <= 3)
              return (
                <g key={id} className={`node node-api${off}`}>
                  <circle cx={x} cy={y} r="15" className="ring" />
                  <circle cx={x} cy={y} r="5" className="core" />
                  <text x={x} y={y + 32} textAnchor="middle">{label}</text>
                </g>
              );
            const w = label.length * 8 + 26;
            return (
              <g key={id} className={`node node-sys${off}`}>
                <rect x={x - w / 2} y={y - 16} width={w} height="32" rx="9" />
                <text x={x} y={y + 5} textAnchor="middle">{label}</text>
              </g>
            );
          })}
        </svg>
        <div className="map-copy">
          <p className="mono text-xs uppercase tracking-[0.16em] text-accent">Integration estate, {year}</p>
          <h3 className="display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{MILESTONE[year]}</h3>
          <p className="text-muted">
            Systems I've connected over the years, flowing through System, Process and Experience APIs. Drag the year to watch the estate grow.
          </p>
        </div>
      </div>
      <div className="yearbar">
        <label htmlFor="map-year" className="mono flex justify-between text-xs text-muted">
          <span>2017</span>
          <output htmlFor="map-year" className="text-ink">{year}</output>
          <span>2026</span>
        </label>
        <input id="map-year" type="range" min="2017" max="2026" step="1" value={year} onChange={(e) => setYear(+e.target.value)} />
      </div>
    </>
  );
}

/* =================== 2. The visitor is the message =================== */

const JOURNEY = [
  { k: '<http:listener path="/career">', t: 'Source · Andhra University', p: 'B.E. Computer Science and Engineering, 2017.', add: { candidate: PROFILE.shortName, education: 'B.E. CSE, Andhra University' } },
  { k: '<set-variable> · TCS 2017', t: 'Assistant System Engineer', p: 'DocuSign integration and pass-through APIs on CloudHub and on-prem.', add: { skills: ['MuleSoft', 'DataWeave', 'Connectors'], awards: ['Quick Learner'] } },
  { k: '<ee:transform> · TCS 2019', t: 'Systems Engineer', p: '20 APIs migrated from Mule 3 to Mule 4, MUnit for around 50 APIs.', add: { muleMigrations: 20, skills: ['MuleSoft', 'DataWeave', 'Connectors', 'MUnit', 'Mule 4'] } },
  { k: '<choice> · Accenture 2020', t: 'Senior Analyst', p: 'Salesforce with Cvent, MDM, ServiceNow, ChargeAfter and SFTP on API-led architecture.', add: { pattern: 'API-led', systems: ['Salesforce', 'Cvent', 'MDM', 'ServiceNow', 'SFTP'] } },
  { k: '<apikit:router> · Accenture 2021', t: 'Team Lead', p: '9 Salesforce orgs, 2M records migrated, real-time sync at 100 req/s.', add: { salesforceOrgs: 9, recordsMigrated: '2M+', throughput: '100 req/s', awards: ['Quick Learner', 'TechStars of the Year', 'PINACCLE', 'ACE ×2'] } },
  { k: '<scatter-gather> · IPS 2025', t: 'MuleSoft Architect', p: 'Salesforce to AT&T, Javelin to Concerto, Agentforce and Data Cloud design.', add: { ai: ['Agentforce', 'Data Cloud'], realtime: ['AT&T', 'Concerto'] } },
  { k: '<http:request> · IHG 2026', t: 'Lead Engineer', p: 'Migration platform, OAuth across the estate, LTS on Java 17, Deal Underwriting automation.', add: { role: 'Lead Engineer, IHG', runtime: 'LTS · Java 17', auth: 'External Client Apps (OAuth 2.0)', certifications: CERT_NAMES.length } },
  { k: '<http:request url="your-team">', t: 'Deliver to your team', p: 'Download the resume or get in touch.', add: { status: 'READY', deliverTo: 'your-team' }, end: true },
];

function MessageJourney() {
  const [step, setStep] = useState(0);
  const box = useRef(null);
  useEffect(() => {
    const root = box.current;
    const cards = [...root.children];
    const io = new IntersectionObserver(
      () => {
        const b = root.getBoundingClientRect();
        const vis = cards.filter((c) => {
          const r = c.getBoundingClientRect();
          return r.top < b.top + b.height * 0.55 && r.bottom > b.top;
        });
        if (vis.length) setStep(+vis[vis.length - 1].dataset.i);
      },
      { root, threshold: [0, 0.5, 1] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);
  const payload = useMemo(() => Object.assign({}, ...JOURNEY.slice(0, step + 1).map((s) => s.add)), [step]);
  return (
    <div className="journey">
      <div className="steps" ref={box}>
        {JOURNEY.map((s, i) => (
          <button
            key={s.k}
            type="button"
            data-i={i}
            onClick={() => setStep(i)}
            className={`step${i === step ? ' active' : ''}${s.end ? ' end' : ''}`}
          >
            <span className="mono text-[11px] text-accent">{s.k}</span>
            <span className="display text-lg font-semibold text-ink">{s.t}</span>
            <span className="text-sm text-muted">{s.p}</span>
          </button>
        ))}
      </div>
      <div className="payload">
        <div className="mono flex justify-between text-xs text-muted">
          <span>payload · application/json</span>
          <span>{JOURNEY[step].t}</span>
        </div>
        <Json value={payload} fresh={new Set(Object.keys(JOURNEY[step].add))} />
      </div>
    </div>
  );
}

/* =================== 3. DataWeave playground =================== */

const DW_INPUT = { name: PROFILE.name, title: PROFILE.title, years: 9, certs: CERT_NAMES, roles: ROLES, stats: Object.fromEntries(STATS.map((s) => [s.label, s.value])) };

const SCRIPTS = {
  recruiter: {
    label: 'Recruiter view · 30 sec',
    src: `%dw 2.0
output application/json
---
{
  name: payload.name,
  now: payload.title,
  experience: payload.years as String ++ "+ years",
  certified: sizeOf(payload.certs) as String ++ "x Salesforce",
  path: payload.roles map ($.role ++ " @ " ++ $.org)
}`,
    run: (p) => ({ name: p.name, now: p.title, experience: `${p.years}+ years`, certified: `${p.certs.length}x Salesforce`, path: p.roles.map((r) => `${r.role} @ ${r.org}`) }),
  },
  architect: {
    label: 'Architect deep-dive',
    src: `%dw 2.0
output application/json
---
payload.roles map (r) -> {
  role: r.role,
  span: r.from as String ++ " - " ++ (r.to default "now") as String,
  delivered: r.highlights
} filter (sizeOf($.delivered) > 2)`,
    run: (p) => p.roles.map((r) => ({ role: r.role, span: `${r.from} - ${r.to ?? 'now'}`, delivered: r.highlights })).filter((x) => x.delivered.length > 2),
  },
  numbers: {
    label: 'Just the numbers',
    src: `%dw 2.0
output application/json
// only what fits on a slide
---
payload.stats ++ {
  rolesHeld: sizeOf(payload.roles),
  muleSoftCerts: sizeOf(payload.certs filter ($ contains "MuleSoft"))
}`,
    run: (p) => ({ ...p.stats, rolesHeld: p.roles.length, muleSoftCerts: p.certs.filter((c) => c.includes('MuleSoft')).length }),
  },
};

const dwHtml = (s) =>
  esc(s)
    .replace(/(\/\/.*)/g, '<span class="cm">$1</span>')
    .replace(/\b(output|map|filter|as|default|sizeOf|contains)\b/g, '<span class="kw">$1</span>')
    .replace(/(%dw 2\.0|---|\+\+|-&gt;)/g, '<span class="op">$1</span>');

function DataWeavePlayground() {
  const [name, setName] = useState('recruiter');
  const s = SCRIPTS[name];
  return (
    <>
      <div className="flex flex-wrap gap-2 border-b border-line px-5 py-3" role="group" aria-label="Choose a view">
        {Object.entries(SCRIPTS).map(([key, v]) => (
          <button key={key} type="button" className="chip" aria-pressed={key === name} onClick={() => setName(key)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="panes">
        <div className="pane">
          <div className="ph"><span>Input · payload</span><span>json</span></div>
          <Json value={DW_INPUT} />
        </div>
        <div className="pane">
          <div className="ph"><span>Script</span><span>dw 2.0</span></div>
          <pre className="dw" dangerouslySetInnerHTML={{ __html: dwHtml(s.src) }} />
        </div>
        <div className="pane">
          <div className="ph"><span>Output</span><span>json</span></div>
          <Json value={s.run(DW_INPUT)} />
        </div>
      </div>
    </>
  );
}

/* =================== 4. Resume as an API =================== */

const AWARDS = EXPERIENCE.flatMap((j) => j.awards);
const API = {
  '/profile': {
    data: { name: PROFILE.name, title: PROFILE.title, location: PROFILE.location, yearsExperience: '9+', links: Object.fromEntries(PROFILE.links.map((l) => [l.label, l.href])) },
    cards: (d) => [[d.name, `${d.title} · ${d.location}`]],
  },
  '/experience': {
    data: ROLES.map((r) => ({ role: r.role, org: r.org, from: r.from, to: r.to ?? 'present' })),
    cards: (d) => d.map((r) => [r.role, `${r.org} · ${r.from} – ${r.to}`]),
  },
  '/certifications': {
    data: CERT_NAMES.map((name) => ({ name, issuer: 'Salesforce' })),
    cards: (d) => d.map((c) => [c.name, c.issuer]),
  },
  '/stats': {
    data: Object.fromEntries(STATS.map((s) => [s.label, s.value])),
    cards: (d) => Object.entries(d).map(([k, v]) => [v, k]),
  },
  '/awards': { data: AWARDS, cards: (d) => d.map((a) => [a, 'Recognition']) },
  '/resume.pdf': {
    data: { href: PROFILE.resume, contentType: 'application/pdf' },
    cards: () => [['Download resume', 'application/pdf']],
  },
};

function ResumeApi() {
  const [path, setPath] = useState('/profile');
  const [view, setView] = useState('json');
  const { data, cards } = API[path];
  return (
    <div className="api">
      <div className="endpoints" role="group" aria-label="Endpoints">
        {Object.keys(API).map((p) => (
          <button key={p} type="button" className="ep" aria-pressed={p === path} onClick={() => setPath(p)}>
            <span className="verb">GET</span>{p}
          </button>
        ))}
      </div>
      <div className="min-w-0">
        <div className="mono flex flex-wrap items-center gap-3 border-b border-line px-5 py-3 text-sm">
          <span className="verb">GET</span>
          <span className="break-all text-muted">https://resume.prajwalk.com/api{path}</span>
          <div className="ml-auto flex gap-2" role="group" aria-label="Response view">
            {['json', 'rendered'].map((v) => (
              <button key={v} type="button" className="chip" aria-pressed={v === view} onClick={() => setView(v)}>
                {v === 'json' ? 'JSON' : 'Rendered'}
              </button>
            ))}
          </div>
        </div>
        <div className="mono flex gap-4 border-b border-line px-5 py-2 text-xs text-muted">
          <span className="text-live">200 OK</span>
          <span>{18 + ((path.length * 7) % 40)} ms</span>
          <span>application/json</span>
        </div>
        {view === 'json' ? (
          <Json value={data} className="max-h-[420px] p-5" />
        ) : (
          <div className="grid max-h-[420px] gap-2.5 overflow-auto p-5">
            {cards(data).map(([b, s]) =>
              path === '/resume.pdf' ? (
                <a key={b} href={PROFILE.resume} download className="api-card hover:border-accent">
                  <b>{b}</b><span>{s}</span>
                </a>
              ) : (
                <div key={b} className="api-card"><b>{b}</b><span>{s}</span></div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =================== Showcase =================== */

const CONCEPTS = [
  { blurb: 'The systems I have integrated, as an API-led network.', Component: IntegrationMap },
  { blurb: 'A payload travels through my career; every role transforms it.', Component: MessageJourney },
  { blurb: 'My resume as input, a DataWeave script as the lens.', Component: DataWeavePlayground },
  { blurb: 'Call the endpoints and read the responses.', Component: ResumeApi },
];

export default function Showcase() {
  // ponytail: one concept picked at random per page load, no switcher
  const [{ Component, blurb }] = useState(() => CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)]);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6" aria-labelledby="explore">
      <div className="mb-5">
        <p className="mono text-xs text-accent">&lt;flow name="explore"&gt;</p>
        <h2 id="explore" className="display mt-2 text-3xl font-semibold text-ink sm:text-4xl">Explore my career</h2>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <p className="border-b border-line px-5 py-3 text-sm text-muted">{blurb}</p>
        <Component />
      </div>
    </section>
  );
}
