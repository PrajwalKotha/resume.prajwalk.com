import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Mail, Pause, Play, RefreshCw, RotateCcw, Volume2 } from 'lucide-react';
import { PROFILE, SKILLS, STATS } from '../data';
import { INTRO, STEPS, TONES } from './content';
import { CardBack, CardFront } from './IdCard';

const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const linkedin = PROFILE.links.find((l) => l.label === 'LinkedIn');

function Header() {
  return (
    <header className="topbar">
      <a href="#top" className="wordmark">
        {PROFILE.shortName}
      </a>
      <nav aria-label="Main">
        <a href="/classic" className="toplink">
          Full résumé <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a href={PROFILE.resume} download className="btn btn-ink btn-sm">
          <Download size={15} aria-hidden="true" /> PDF
        </a>
      </nav>
    </header>
  );
}

const BUTTON = {
  idle: [Play, 'Play my intro'],
  preview: [Volume2, 'Play with sound'],
  playing: [Pause, 'Pause'],
  paused: [Play, 'Resume'],
  ended: [RotateCcw, 'Replay'],
};

// The talking intro. The clip's grey studio backdrop is lighter than the page,
// so `mix-blend-mode: darken` drops it and the character stands on the page.
// It plays once muted with word-by-word captions; the button replays it with sound.
function Hero() {
  const video = useRef(null);
  const hero = useRef(null);
  const lastLine = useRef(INTRO.lines[0]);
  const [mode, setMode] = useState('idle');
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reducedMotion() || navigator.connection?.saveData) return;
    const v = video.current;
    v.muted = true;
    v.play()
      .then(() => setMode('preview'))
      .catch(() => {});
  }, []);

  // per-frame clock so the words light up on time
  useEffect(() => {
    if (mode !== 'preview' && mode !== 'playing') return undefined;
    let id;
    const tick = () => {
      setT(video.current.currentTime);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [mode]);

  // parallax out as the hero scrolls away
  useEffect(() => {
    if (reducedMotion()) return undefined;
    let id;
    const onScroll = () => {
      cancelAnimationFrame(id);
      id = requestAnimationFrame(() => {
        const h = hero.current;
        h.style.setProperty('--hp', clamp(window.scrollY / h.offsetHeight).toFixed(3));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => {
    const v = video.current;
    if (mode === 'playing') {
      v.pause();
      setMode('paused');
      return;
    }
    if (mode !== 'paused') v.currentTime = 0;
    v.muted = false;
    setMode('playing');
    v.play().catch(() => setMode('idle'));
  };

  const line = mode === 'idle' || mode === 'ended' ? null : INTRO.lines.find((l) => t >= l.from && t < l.to);
  if (line) lastLine.current = line;
  const [Icon, label] = BUTTON[mode];
  const duration = video.current?.duration || 8;

  return (
    <section id="top" ref={hero} className="hero" aria-label="Intro">
      <div className="hero-copy">
        <p className="kicker">MuleSoft · Salesforce · Data Cloud</p>
        <h1 className="display">
          Hi, I&rsquo;m <em>Prajwal.</em>
        </h1>
      </div>
      <div className="hero-more">
        <p className="lede">
          Integration architect and Lead Engineer at IHG Hotels &amp; Resorts. I connect Salesforce to everything else.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-ink play" onClick={toggle} aria-describedby="intro-transcript">
            <Icon size={17} aria-hidden="true" /> {label}
            <span className="prog" style={{ '--prog': mode === 'idle' ? 0 : clamp(t / duration) }} aria-hidden="true" />
          </button>
          <a href="#card" className="btn btn-ghost">
            See my card <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="status">
          <span className="dot" aria-hidden="true" /> status: STARTED · {PROFILE.location.split(',')[0]}, IN
        </p>
        <p id="intro-transcript" className="sr-only">
          Transcript: {INTRO.lines.map((l) => l.words.map(([, w]) => w).join(' ')).join(' ')}
        </p>
      </div>

      <div className="stage">
        <div className="vbox">
          <video
            ref={video}
            className="talker"
            src={INTRO.video}
            poster={INTRO.poster}
            playsInline
            preload="auto"
            onEnded={() => setMode('ended')}
            aria-hidden="true"
          />
          <div className="bwrap" aria-hidden="true">
            <div className="bubble" data-show={Boolean(line)}>
              {mode === 'playing' && (
                <span className="eq">
                  <i />
                  <i />
                  <i />
                </span>
              )}
              {lastLine.current.words.map(([at, w]) => (
                <span key={at} className={t >= at ? 'w on' : 'w'}>
                  {w}{' '}
                </span>
              ))}
            </div>
          </div>
          {/* the character himself is a big play target too */}
          <div className="hotspot" onClick={toggle} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

// front 0-12%, turns to the back by 42%, holds, turns home by 88%
function turn(p, reduce) {
  if (reduce) return p < 0.35 ? 0 : p < 0.75 ? 0.5 : 1;
  if (p < 0.12) return 0;
  if (p < 0.42) return ease((p - 0.12) / 0.3) * 0.5;
  if (p < 0.58) return 0.5;
  if (p < 0.88) return 0.5 + ease((p - 0.58) / 0.3) * 0.5;
  return 1;
}

// The ID card on a lanyard. The section is tall and its stage is sticky, so
// scrolling through it turns the card; springs give it weight and a swing.
function CardScene() {
  const scene = useRef(null);
  const stage = useRef(null);
  const rig = useRef(null);
  const card = useRef(null);
  const shadow = useRef(null);
  const flip = useRef(0);
  const dragDeg = useRef(0);
  const drag = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduce = reducedMotion();
    const s = { ry: -80, vry: 0, sw: 0, vsw: 0 };
    let raf = 0;
    let last = performance.now();
    let lastY = window.scrollY;

    const frame = (now) => {
      // real elapsed time, so the card keeps pace on slow or throttled screens
      const dt = Math.min((now - last) / 1000, 0.25);
      last = now;
      const r = scene.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp(-r.top / (r.height - vh));
      const enter = clamp(1 - r.top / vh);
      const target = turn(p, reduce) * 360 - (reduce ? 0 : 80 * (1 - ease(enter))) + flip.current + dragDeg.current;
      const vel = (window.scrollY - lastY) / Math.max(dt, 1e-3);
      lastY = window.scrollY;
      const pt = pointer.current;
      pt.x += (pt.tx - pt.x) * 0.12;
      pt.y += (pt.ty - pt.y) * 0.12;

      if (reduce) {
        s.ry = target;
        s.sw = 0;
      } else {
        const swingTo = clamp(-vel * 0.004, -7, 7);
        // fixed 1/120 s steps keep the springs stable whatever the frame rate
        for (let left = dt; left > 0; left -= 1 / 120) {
          const h = Math.min(left, 1 / 120);
          s.vry += (90 * (target - s.ry) - 17 * s.vry) * h;
          s.ry += s.vry * h;
          s.vsw += (36 * (swingTo - s.sw) - 4 * s.vsw) * h;
          s.sw += s.vsw * h;
        }
      }

      const a = s.ry;
      const cos = Math.cos((a * Math.PI) / 180);
      const rx = reduce ? 0 : Math.sin(p * Math.PI * 2) * 5 + pt.y;
      rig.current.style.transform = `rotate(${s.sw.toFixed(3)}deg)`;
      card.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${(a + pt.x).toFixed(2)}deg)`;
      card.current.style.setProperty('--turn', ((((a % 360) + 360) % 360) / 360).toFixed(3));
      card.current.style.setProperty('--s', Math.sin((a * Math.PI) / 180).toFixed(3));
      shadow.current.style.transform = `translateX(-50%) scaleX(${(0.3 + 0.7 * Math.abs(cos)).toFixed(3)})`;
      scene.current.style.setProperty('--p', p.toFixed(3));

      const st = cos < 0 ? 1 : p < 0.5 ? 0 : 2;
      if (st !== stepRef.current) {
        stepRef.current = st;
        setStep(st);
      }
      raf = requestAnimationFrame(frame);
    };

    // only animate while the scene is near the screen
    const io = new IntersectionObserver(
      ([e]) => {
        cancelAnimationFrame(raf);
        if (e.isIntersecting) {
          last = performance.now();
          lastY = window.scrollY;
          raf = requestAnimationFrame(frame);
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(scene.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const onPointerMove = (e) => {
    const box = stage.current.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    const y = (e.clientY - box.top) / box.height;
    card.current.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    card.current.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
    const d = drag.current;
    if (d) {
      const dx = e.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 6) {
        d.moved = true;
        stage.current.setPointerCapture(e.pointerId);
      }
      if (d.moved) dragDeg.current = dx * 0.55;
      return;
    }
    if (e.pointerType === 'mouse') {
      pointer.current.tx = (x - 0.5) * 16;
      pointer.current.ty = (0.5 - y) * 10;
    }
  };

  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    // settle on whichever face is nearer
    flip.current = Math.round((flip.current + dragDeg.current) / 180) * 180;
    dragDeg.current = 0;
  };

  return (
    <section id="card" ref={scene} className="card-scene" aria-label="ID card">
      <div className="card-sticky">
        <div className="card-head">
          <p className="kicker">02 · ID</p>
          <h2 className="display h2">
            Here&rsquo;s my <em>card.</em>
          </h2>
          <p className="hint">Scroll or drag to turn it over.</p>
          <button
            type="button"
            className="btn btn-ghost btn-sm flip"
            onClick={() => {
              flip.current += 180;
            }}
          >
            <RefreshCw size={15} aria-hidden="true" /> Flip card
          </button>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} data-on={i === step}>
              <span className="step-kicker">{s.kicker}</span>
              <strong>{s.title}</strong>
              <span className="step-text">{s.text}</span>
              {i === 2 && (
                <a href={PROFILE.resume} download className="btn btn-ink btn-sm step-cta">
                  <Download size={15} aria-hidden="true" /> Download PDF
                </a>
              )}
            </li>
          ))}
        </ol>

        <div
          ref={stage}
          className="card-stage"
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, moved: false };
          }}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => {
            pointer.current.tx = 0;
            pointer.current.ty = 0;
          }}
        >
          <div ref={rig} className="rig">
            <span className="strap" aria-hidden="true">
              <span>
                PRAJWALK.COM · MULESOFT · SALESFORCE · DATA CLOUD · PRAJWALK.COM · MULESOFT · SALESFORCE · DATA CLOUD ·
              </span>
            </span>
            <svg className="clip" viewBox="0 0 40 64" aria-hidden="true">
              <defs>
                <linearGradient id="steel" x1="0" x2="1">
                  <stop offset="0" stopColor="#8d939c" />
                  <stop offset=".45" stopColor="#f4f6f8" />
                  <stop offset="1" stopColor="#7d838c" />
                </linearGradient>
              </defs>
              <rect x="6" y="0" width="28" height="14" rx="3" fill="url(#steel)" />
              <circle cx="20" cy="24" r="9" fill="none" stroke="url(#steel)" strokeWidth="4" />
              <rect x="14" y="31" width="12" height="33" rx="3" fill="url(#steel)" />
            </svg>
            <div ref={card} className="card3d">
              <CardFront />
              <CardBack />
              <span className="edge edge-l" aria-hidden="true" />
              <span className="edge edge-r" aria-hidden="true" />
            </div>
          </div>
          <span ref={shadow} className="card-shadow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.dataset.in = 'true';
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Every tool from the résumé as a keycap, one board per group. Each board
// tilts flat and its keys rise as it scrolls in (--in, 0 to 1).
function Toolbox() {
  const boards = useRef([]);
  const total = SKILLS.reduce((n, g) => n + g.items.length, 0);

  useEffect(() => {
    if (reducedMotion()) return undefined;
    let id;
    const update = () => {
      const vh = window.innerHeight;
      boards.current.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        el.style.setProperty('--in', clamp((vh - top) / (vh * 0.6)).toFixed(3));
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(id);
      id = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <section className="toolbox" aria-labelledby="tools-title">
      <p className="kicker reveal">03 · Toolbox</p>
      <h2 id="tools-title" className="display h2 reveal">
        What I build <em>with.</em>
      </h2>
      <p className="lede reveal">
        {total} tools I have shipped production integrations with, from the Anypoint Platform to Salesforce Data Cloud.
      </p>
      <div className="boards">
        {SKILLS.map((g, i) => (
          <div
            key={g.group}
            ref={(el) => {
              boards.current[i] = el;
            }}
            className="board"
            style={{ '--tone': TONES[g.group] }}
          >
            <header>
              <h3>{g.group}</h3>
              <span aria-label={`${g.items.length} tools`}>{g.items.length}</span>
            </header>
            {/* the empty touch handler lets iOS show :active, so keys press under a finger */}
            <ul onTouchStart={() => {}}>
              {g.items.map((s, k) => (
                <li key={s} className={s.length > 15 ? 'key wide' : 'key'} style={{ '--k': k }}>
                  <i aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// '100/s' -> counts 0..100 then shows '/s'
function Count({ value }) {
  const ref = useRef(null);
  const [, num, suffix] = value.match(/^(\d+)(.*)$/) ?? [null, null, value];
  const [n, setN] = useState(num && !reducedMotion() ? 0 : num);

  useEffect(() => {
    if (!num || reducedMotion()) return undefined;
    let id;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const k = clamp((now - t0) / 1300);
        setN(Math.round(+num * (1 - (1 - k) ** 3)));
        if (k < 1) id = requestAnimationFrame(tick);
      };
      id = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(id);
    };
  }, [num]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
    </span>
  );
}

function Numbers() {
  return (
    <section className="numbers" aria-labelledby="numbers-title">
      <p className="kicker reveal">04 · In numbers</p>
      <h2 id="numbers-title" className="sr-only">
        In numbers
      </h2>
      <dl>
        {STATS.map((s, i) => (
          <div key={s.label} className="reveal" style={{ '--d': `${i * 70}ms` }}>
            <dt>{s.label}</dt>
            <dd className="display">
              <Count value={s.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Footer() {
  return (
    <footer className="outro">
      <p className="kicker reveal">05 · Say hello</p>
      <h2 className="display h1 reveal">
        Let&rsquo;s build something <em>that connects.</em>
      </h2>
      <div className="outro-actions reveal">
        <a href={`mailto:${PROFILE.email}`} className="btn btn-ink">
          <Mail size={17} aria-hidden="true" /> Email me
        </a>
        <a href={linkedin.href} target="_blank" rel="noreferrer" className="btn btn-ghost">
          LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={PROFILE.resume} download className="btn btn-ghost">
          <Download size={16} aria-hidden="true" /> Résumé PDF
        </a>
        <a href="/classic" className="btn btn-ghost">
          Full résumé <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="fine">
        © {new Date().getFullYear()} {PROFILE.name} · 3D character and voice made with Gemini and Google Flow
      </p>
    </footer>
  );
}

export default function Page() {
  useReveal();
  return (
    <>
      <a href="#card" className="skip">
        Skip to the ID card
      </a>
      <Header />
      <main>
        <Hero />
        <CardScene />
        <Toolbox />
        <Numbers />
      </main>
      <Footer />
    </>
  );
}
