import { CERTIFICATIONS, PROFILE } from '../data';
import { CARD } from './content';

// Bars from the bits of each character: 1 = wide, 0 = narrow, alternating ink and gap.
function Barcode({ value }) {
  const bars = [];
  let x = 0;
  [...value].forEach((ch) => {
    ch.charCodeAt(0)
      .toString(2)
      .padStart(8, '0')
      .split('')
      .forEach((bit, i) => {
        const w = bit === '1' ? 2 : 1;
        if (i % 2 === 0) bars.push(<rect key={x} x={x} y="0" width={w} height="1" />);
        x += w;
      });
  });
  return (
    <svg className="barcode" viewBox={`0 0 ${x} 1`} preserveAspectRatio="none" aria-hidden="true">
      {bars}
    </svg>
  );
}

function Chip() {
  return (
    <svg className="chip" viewBox="0 0 48 36" aria-hidden="true">
      <defs>
        <linearGradient id="chip-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dc9b" />
          <stop offset=".5" stopColor="#c9a24f" />
          <stop offset="1" stopColor="#f0d58c" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="34" rx="6" fill="url(#chip-gold)" />
      <path
        d="M1 12h14M1 24h14M33 12h14M33 24h14M15 1v34M33 1v34M15 18h18"
        stroke="#8c6a25"
        strokeOpacity=".55"
        fill="none"
      />
    </svg>
  );
}

// Round holographic sticker over the photo corner.
function Seal() {
  return (
    <svg className="seal" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id="seal-ring" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
      </defs>
      <circle cx="50" cy="50" r="48" className="seal-disc" />
      <text className="seal-ring">
        <textPath href="#seal-ring" textLength="222" lengthAdjust="spacing">
          SALESFORCE CERTIFIED · SIX TIMES ·
        </textPath>
      </text>
      <text x="50" y="60" textAnchor="middle" className="seal-num">
        6×
      </text>
    </svg>
  );
}

export function CardFront() {
  return (
    <div className="face front">
      <span className="slot" aria-hidden="true" />
      <header className="cf-head">
        <span className="mark" aria-hidden="true">
          pk
        </span>
        <span className="cf-site">prajwalk.com</span>
        <Chip />
      </header>
      <div className="cf-photo">
        <img src={CARD.portrait} alt="3D character portrait of Prajwal Kotha" width="600" height="750" />
        <Seal />
      </div>
      <div className="cf-who">
        <p className="cf-first">Satya Surya</p>
        <h3 className="cf-name">Prajwal Kotha</h3>
        <p className="cf-role">{CARD.role}</p>
        <p className="cf-org">{CARD.org}</p>
      </div>
      <dl className="cf-fields">
        <div>
          <dt>ID</dt>
          <dd>{CARD.id}</dd>
        </div>
        <div>
          <dt>Since</dt>
          <dd>{CARD.since}</dd>
        </div>
        <div>
          <dt>Base</dt>
          <dd>{CARD.base}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd className="live">STARTED</dd>
        </div>
      </dl>
      <Barcode value={`${CARD.id} PRAJWALK`} />
      <span className="holo" aria-hidden="true" />
      <span className="glare" aria-hidden="true" />
    </div>
  );
}

export function CardBack() {
  const linkedin = PROFILE.links.find((l) => l.label === 'LinkedIn');
  return (
    <div className="face back">
      <span className="slot" aria-hidden="true" />
      <p className="cb-kicker">If found, please connect</p>
      <section className="cb-certs" aria-label="Certifications">
        <h4>Certified ×{CERTIFICATIONS.length}</h4>
        <ul>
          {CERTIFICATIONS.map((c) => (
            <li key={c.name}>
              <img src={c.img} alt={c.name} title={c.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </section>
      <ul className="cb-stack" aria-label="Core stack">
        {CARD.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="cb-contact">
        <img src={CARD.qr} alt="QR code for resume.prajwalk.com" className="qr" width="31" height="31" />
        <div>
          <a href="/classic">resume.prajwalk.com/classic</a>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <a href={linkedin.href} target="_blank" rel="noreferrer">
            {linkedin.href.replace('https://www.', '')}
          </a>
        </div>
      </div>
      <div className="cb-sign">
        <span className="sig" aria-hidden="true">
          Prajwal
        </span>
        <span className="sig-line">Authorised signatory</span>
      </div>
      <p className="cb-fine">Valid while integrations are running · status: STARTED</p>
      <span className="glare" aria-hidden="true" />
    </div>
  );
}
