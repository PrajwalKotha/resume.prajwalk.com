import {
  ArrowUpRight,
  Award,
  ChevronDown,
  Download,
  GitFork,
  GraduationCap,
  Inbox,
  Mail,
  MapPin,
  Phone,
  Route,
  Send,
  Shuffle,
  Split,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SKILLS,
  STATS,
} from './data';
import Showcase from './Showcase';

const KIND_ICON = {
  'HTTP Listener': Inbox,
  'Transform Message': Shuffle,
  Choice: GitFork,
  'APIkit Router': Route,
  'Scatter-Gather': Split,
  'HTTP Request': Send,
};

const NAV = [
  ['Explore', '#explore'],
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Certifications', '#certifications'],
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function SectionHead({ id, flow, title }) {
  return (
    <header className="mb-8">
      <p className="mono text-xs text-accent">
        &lt;flow name="{flow}"&gt;
      </p>
      <h2 id={id} className="display mt-2 text-3xl sm:text-4xl font-semibold text-ink">
        {title}
      </h2>
    </header>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ground/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="display text-lg font-semibold text-ink">
          {PROFILE.shortName}
        </a>
        <ul className="ml-auto hidden items-center gap-6 md:flex">
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="text-sm text-muted hover:text-ink">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={PROFILE.resume}
          download
          className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-ground hover:bg-accent-strong md:ml-0"
        >
          <Download size={16} aria-hidden="true" /> <span className="sm:hidden">Resume</span><span className="hidden sm:inline">Download resume</span>
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="mono text-xs uppercase tracking-[0.18em] text-accent">{PROFILE.kicker}</p>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            {PROFILE.name}
          </h1>
          <p className="mt-4 text-lg text-muted sm:text-xl">
            {PROFILE.title}. I design, build and run the integrations that keep Salesforce,
            partner and internal systems talking.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} aria-hidden="true" /> {PROFILE.location}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PROFILE.resume}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-ground hover:bg-accent-strong"
            >
              <Download size={16} aria-hidden="true" /> Download resume
            </a>
            {PROFILE.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-4 text-sm text-ink hover:border-accent hover:text-accent"
              >
                {l.label} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="relative order-first mx-auto md:order-none md:mx-0">
          <img
            src={PROFILE.photo}
            alt={PROFILE.name}
            width="200"
            height="200"
            className="h-32 w-32 rounded-2xl object-cover ring-1 ring-line sm:h-52 sm:w-52"
          />
          <span className="mono absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 text-[11px] text-ink">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-live align-middle" />
            status: STARTED
          </span>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section aria-label="Highlights" className="border-y border-line bg-surface/60">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="py-7 pr-4">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="display mt-1 text-3xl font-semibold text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead id="about" flow="summary" title="About" />
      <p className="max-w-3xl text-lg leading-relaxed text-ink/90">{PROFILE.summary}</p>
    </section>
  );
}

function Job({ job }) {
  const Icon = KIND_ICON[job.kind] ?? Send;
  return (
    <li className="relative pl-14 sm:pl-20">
      {/* the flow node sitting on the rail */}
      <span
        className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border sm:left-3 ${
          job.current ? 'border-accent bg-accent/15 text-accent' : 'border-line bg-surface text-muted'
        }`}
        aria-hidden="true"
      >
        <Icon size={18} />
      </span>
      <details open={job.current} className="group rounded-2xl border border-line bg-surface/70 open:bg-surface">
        <summary className="flex cursor-pointer list-none items-start gap-4 p-5 sm:p-6">
          <div className="min-w-0 flex-1">
            <p className="mono text-[11px] text-muted">
              {job.kind} · doc:id="{slug(job.org)}-{job.period.slice(-4)}"
              {job.current && (
                <span className="ml-2 rounded-full bg-live/15 px-2 py-0.5 text-live">live</span>
              )}
            </p>
            <h3 className="display mt-2 text-xl font-semibold text-ink sm:text-2xl">{job.role}</h3>
            <p className="mt-1 text-ink/85">
              {job.org} <span className="text-muted">· {job.team}</span>
            </p>
            <p className="mono mt-1 text-xs text-muted">
              {job.period} · {job.where}
            </p>
          </div>
          <ChevronDown
            size={20}
            className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
          {job.intro && <p className="mb-4 text-ink/90">{job.intro}</p>}
          <ul className="space-y-3">
            {job.bullets.map(([label, text]) => (
              <li key={label} className="leading-relaxed text-ink/85">
                <span className="font-semibold text-ink">{label}.</span> {text}
              </li>
            ))}
          </ul>
          {job.awards.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {job.awards.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-full border border-award/40 bg-award/10 px-3 py-1 text-sm text-award"
                >
                  <Award size={14} aria-hidden="true" /> {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>
    </li>
  );
}

function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead id="experience" flow="career-progression" title="Experience" />
      <ol className="relative space-y-6 before:absolute before:bottom-4 before:left-5 before:top-4 before:w-px before:bg-line sm:before:left-8">
        {EXPERIENCE.map((job) => (
          <Job key={job.role + job.period} job={job} />
        ))}
        <li className="relative pl-14 sm:pl-20">
          <span
            className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted sm:left-3"
            aria-hidden="true"
          >
            <GraduationCap size={18} />
          </span>
          <div className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-6">
            <p className="mono text-[11px] text-muted">source · education</p>
            <h3 className="display mt-2 text-xl font-semibold text-ink">{EDUCATION.school}</h3>
            <p className="mt-1 text-ink/85">{EDUCATION.degree}</p>
            <p className="mono mt-1 text-xs text-muted">{EDUCATION.date}</p>
          </div>
        </li>
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead id="skills" flow="mule-palette" title="Skills" />
        <div className="grid gap-8 md:grid-cols-2">
          {SKILLS.map((g) => (
            <div key={g.group}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">{g.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-lg border border-line bg-ground px-3 py-1.5 text-sm text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHead id="certifications" flow="certifications" title="Salesforce certified, six times" />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CERTIFICATIONS.map((c) => (
          <li key={c.name} className="flex flex-col items-center rounded-2xl border border-line bg-surface/70 p-4 text-center">
            <img src={c.img} alt="" loading="lazy" className="h-24 w-24 object-contain" />
            <p className="mt-3 text-sm text-ink">{c.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mono text-xs text-accent">&lt;/flow&gt;</p>
        <h2 className="display mt-2 text-3xl font-semibold text-ink sm:text-4xl">Let's build something that connects.</h2>
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
          <li>
            <a href={PROFILE.resume} download className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:text-accent-strong">
              <Download size={18} aria-hidden="true" /> Download resume (PDF)
            </a>
          </li>
          <li>
            <a href={`mailto:${PROFILE.email}`} className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-accent">
              <Mail size={18} aria-hidden="true" /> {PROFILE.email}
            </a>
          </li>
          <li>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-accent">
              <Phone size={18} aria-hidden="true" /> {PROFILE.phone}
            </a>
          </li>
          {PROFILE.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-ink hover:text-accent">
                {l.label} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mono mt-12 text-xs text-muted">
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
      </div>
    </footer>
  );
}

export default function Resume() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-ground">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Showcase />
        <About />
        <Experience />
        <Skills />
        <Certifications />
      </main>
      <Contact />
    </>
  );
}
