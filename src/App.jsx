import { useState, useEffect, useRef } from 'react'
import { PopupButton } from 'react-calendly'

const CALENDLY_URL = 'https://calendly.com/PLACEHOLDER/speaking-inquiry'
const EMAIL = 'info@northstar-tg.com'
const PHONE = '(701) 237-9096'

/* ─── Scroll reveal ─── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}
function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

/* ─── Icons ─── */
const I = ({ d, className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)
const ShieldIcon = (p) => <I {...p} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
const MicIcon = (p) => <I {...p} d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3-3Z" />
const UsersIcon = (p) => <I {...p} d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
const CheckIcon = (p) => <I {...p} d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
const LightIcon = (p) => <I {...p} d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
const RocketIcon = (p) => <I {...p} d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
const BookIcon = (p) => <I {...p} d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
const ClockIcon = (p) => <I {...p} d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
const PhoneIcon = (p) => <I {...p} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
const MailIcon = (p) => <I {...p} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
const DownloadIcon = (p) => <I {...p} d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
const StarIcon = (p) => <I {...p} d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
const ChartIcon = (p) => <I {...p} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />

/* ─── Data ─── */
const TOPICS = [
  {
    num: '01',
    title: 'Protect to Propel™',
    tag: 'Flagship Keynote',
    audience: 'Executives & Business Owners',
    duration: '30 / 45 / 60 min',
    desc: 'Most organizations treat cybersecurity as a cost center and AI as hype. This keynote flips both — showing leaders how security and AI become a strategic growth engine when aligned with business objectives.',
    takeaways: ['Reframe security from expense to competitive advantage', 'Practical AI use cases you can implement this quarter', 'The 3-pillar framework: Protect → Reduce Friction → Propel Growth'],
    icon: RocketIcon,
  },
  {
    num: '02',
    title: 'The New HIPAA Reality',
    tag: 'Healthcare Focus',
    audience: 'Healthcare IT & Compliance Leaders',
    duration: '30 / 45 / 60 min',
    desc: 'HIPAA enforcement is intensifying. This talk gives healthcare leaders a clear, actionable roadmap for regulatory readiness — without the jargon or paralysis.',
    takeaways: ['Current enforcement trends and what they mean for you', 'Risk assessment essentials for non-IT professionals', 'Step-by-step compliance roadmap'],
    icon: ShieldIcon,
  },
  {
    num: '03',
    title: 'AI for SMB Leaders',
    tag: 'Practical & Profitable',
    audience: 'Business Owners & Operators',
    duration: '30 / 45 / 60 min',
    desc: 'Cut through the AI noise. This session delivers 10-20 real use cases that SMBs can implement immediately — securely, practically, and profitably.',
    takeaways: ['10-20 actionable AI use cases for your business', 'How to evaluate AI tools without the hype', 'Security guardrails for safe AI adoption'],
    icon: LightIcon,
  },
  {
    num: '04',
    title: 'Cyber Incident Readiness',
    tag: 'Crisis Preparedness',
    audience: 'Executive & IT Leadership',
    duration: '30 / 45 / 60 min',
    desc: 'If you\'re breached tomorrow, is your team ready? This talk replaces panic with a clear, rehearsed game plan — from detection through recovery.',
    takeaways: ['Incident response plan essentials', 'First 72 hours: what to do (and not do)', 'Cyber insurance and legal considerations'],
    icon: ShieldIcon,
  },
  {
    num: '05',
    title: 'From IT Support to Strategic Advantage',
    tag: 'MSP & IT Leadership',
    audience: 'MSPs & IT Directors',
    duration: '30 / 45 / 60 min',
    desc: 'Technology should drive the business — not just keep the lights on. This session provides an operational maturity framework for IT leaders ready to level up.',
    takeaways: ['Operational maturity assessment framework', 'Moving from reactive to strategic IT', 'Building executive-level influence as a tech leader'],
    icon: ChartIcon,
  },
]

const TESTIMONIALS = [
  {
    quote: "NorthStar Technology Group has surpassed expectations to not only rapidly respond to helpdesk needs from staff but also effectively work with us to resolve IT security and HIPAA risks in a timely manner.",
    name: "Director of Human Resources",
    org: "St. Luke's Healthcare",
  },
  {
    quote: "Managing technology for 200 employees in five locations with many remote employees is a difficult task. NorthStar Technology Group provides the tools and people to make this job so much easier.",
    name: "Lynn, Chief Financial Officer",
    org: "Lakeland Mental Health Services",
  },
  {
    quote: "NorthStar Technology Group doesn't assume I know all the information technology lingo; they make recommendations that are easy to understand and practical to our business.",
    name: "Chief Financial Officer",
    org: "Gary Cavett and Company CPAs",
  },
  {
    quote: "Ken is compassionate and has great integrity, always striving to do the right thing for his clients and in his business partnerships.",
    name: "Industry Partner",
    org: "LinkedIn Recommendation",
  },
]

const FORMATS = [
  { name: 'Keynotes', desc: 'High-energy, main-stage presentations for conferences and events', icon: MicIcon },
  { name: 'Breakout Sessions', desc: 'Interactive, focused sessions for smaller groups within larger events', icon: UsersIcon },
  { name: 'Panel Discussions', desc: 'Expert perspective alongside other industry leaders', icon: UsersIcon },
  { name: 'Webinars', desc: 'Virtual presentations for distributed teams and online events', icon: LightIcon },
  { name: 'Executive Workshops', desc: 'Hands-on sessions for leadership teams and boards', icon: BookIcon },
  { name: 'Private Board Briefings', desc: 'Confidential strategy sessions for boards and C-suites', icon: ShieldIcon },
]

const CREDENTIALS = [
  { label: 'Years in IT', value: '30+' },
  { label: 'Inc. 5000', value: '2×' },
  { label: 'Orgs Secured', value: '100+' },
  { label: 'Employees Led', value: '23K' },
]

function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div className="min-h-screen bg-midnight text-white font-sans antialiased">

      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-midnight/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#" className="font-bold text-lg tracking-tight">
            Ken <span className="gradient-text">Satkunam</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-accent transition">About</a>
            <a href="#keynote" className="hover:text-accent transition">Keynote</a>
            <a href="#topics" className="hover:text-accent transition">Topics</a>
            <a href="#testimonials" className="hover:text-accent transition">Testimonials</a>
            <a href="#contact" className="hover:text-accent transition">Contact</a>
            <PopupButton
              url={CALENDLY_URL}
              rootElement={document.getElementById('root')}
              text="Book Ken"
              className="btn-accent text-white px-5 py-2 rounded-lg font-semibold cursor-pointer text-sm"
            />
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {mobileMenu
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-white/5 bg-midnight/98 backdrop-blur-xl px-4 pb-4 space-y-1">
            {['About','Keynote','Topics','Testimonials','Contact'].map(i => (
              <a key={i} href={`#${i.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block py-3 text-gray-400 hover:text-white transition text-sm font-medium">{i}</a>
            ))}
            <PopupButton url={CALENDLY_URL} rootElement={document.getElementById('root')} text="Book Ken" className="block w-full btn-accent text-white text-center px-5 py-3 rounded-lg font-semibold cursor-pointer mt-2 text-sm" />
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <header className="relative pt-28 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-40 right-[15%] w-96 h-96 bg-blue-500/8 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")'}} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in-up border border-accent/20">
                <ShieldIcon className="w-4 h-4" />
                Cybersecurity & AI Strategist
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight animate-fade-in-up" style={{animationDelay:'0.1s'}}>
                Protect to Propel™
              </h1>
              <p className="mt-3 text-xl sm:text-2xl text-gray-300 font-medium animate-fade-in-up" style={{animationDelay:'0.15s'}}>
                Cybersecurity & AI That Drives <span className="gradient-text">Business Growth</span>
              </p>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl animate-fade-in-up" style={{animationDelay:'0.2s'}}>
                Ken Satkunam helps organizations turn cybersecurity and AI from cost centers into competitive advantages. Strategic, practical, and executive-friendly.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay:'0.3s'}}>
                <PopupButton
                  url={CALENDLY_URL}
                  rootElement={document.getElementById('root')}
                  text="Book Ken for Your Event →"
                  className="btn-accent text-white font-bold px-8 py-4 rounded-xl text-lg cursor-pointer text-center"
                />
                <a href="#media-kit" className="btn-outline inline-flex items-center justify-center gap-2 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg">
                  <DownloadIcon className="w-5 h-5" />
                  Speaker Kit
                </a>
              </div>
            </div>
            {/* Headshot placeholder */}
            <div className="hidden lg:flex justify-center animate-fade-in-up" style={{animationDelay:'0.4s'}}>
              <div className="w-80 h-96 rounded-2xl bg-gradient-to-br from-midnight-lighter to-midnight border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
                <div className="text-center relative z-10">
                  <div className="w-32 h-32 mx-auto rounded-full bg-midnight-lighter border-2 border-accent/20 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold gradient-text">KS</span>
                  </div>
                  <p className="text-white font-bold text-lg">Ken Satkunam</p>
                  <p className="text-accent text-sm font-medium">CISM</p>
                  <p className="text-gray-500 text-xs mt-1">CEO, NorthStar Technology Group</p>
                </div>
              </div>
            </div>
          </div>

          {/* Credential bar */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up" style={{animationDelay:'0.5s'}}>
            {CREDENTIALS.map(({ label, value }) => (
              <div key={label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text">{value}</div>
                <div className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ─── ABOUT / AUTHORITY ─── */}
      <section id="about" className="py-16 sm:py-24 bg-midnight-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">About Ken</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Trusted by Leaders. Proven in the Field.</h2>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p className="text-lg">
                  <strong className="text-white">Ken Satkunam, CISM</strong> is the CEO and Founder of <strong className="text-white">NorthStar Technology Group</strong>, a 2× Inc. 5000 cybersecurity and managed IT firm based in Fargo, North Dakota.
                </p>
                <p>
                  With <strong className="text-white">30+ years</strong> in information technology — serving in nearly every IT role from technical support to CIO for healthcare organizations as large as <strong className="text-white">23,000 employees</strong> (including Banner Health) — Ken brings a rare combination of deep technical expertise and executive-level business acumen.
                </p>
                <p>
                  Today, NorthStar secures <strong className="text-white">100+ organizations</strong> across healthcare, legal, and financial services. Ken is a published author, HCCA conference speaker, and the creator of the <strong className="text-white">Protect to Propel™</strong> framework — a strategic approach that transforms security and AI from cost centers into growth engines.
                </p>
                <p>
                  His mission: help business leaders — especially in rural healthcare — protect their organizations and propel them forward with confidence.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="space-y-4">
                {[
                  { label: 'CEO & Founder', detail: 'NorthStar Technology Group (est. 2000)' },
                  { label: 'Certification', detail: 'CISM — Certified Information Security Manager' },
                  { label: 'Published Author', detail: '"Cyber Attack Prevention" + articles in eWeek & DM News' },
                  { label: 'Conference Speaker', detail: 'HCCA Compliance Institute, SBAND, industry webinars' },
                  { label: 'Former CIO', detail: 'Healthcare systems up to 23,000 employees' },
                  { label: '2× Inc. 5000', detail: 'Recognized 2024 & 2025 for rapid growth' },
                  { label: 'Proprietary Tools', detail: 'S2Score — NIST/HIPAA/ISO risk assessment framework' },
                  { label: 'Industries', detail: 'Healthcare, legal, finance, SMB, MSPs' },
                ].map(({ label, detail }) => (
                  <div key={label} className="glass-card rounded-xl px-5 py-3.5 flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white text-sm">{label}</span>
                      <span className="text-gray-400 text-sm"> — {detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SIGNATURE KEYNOTE ─── */}
      <section id="keynote" className="py-16 sm:py-24 bg-surface text-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-accent-dark text-sm font-semibold tracking-wider uppercase mb-3">Signature Keynote</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight">Protect to Propel™</h2>
              <p className="mt-4 text-gray-500 text-lg">The framework that transforms how leaders think about cybersecurity and AI.</p>
            </div>
          </Reveal>

          {/* The Problem */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-midnight rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 text-red-400">The Problem</h3>
                <p className="text-gray-400 mb-4">Most businesses treat cybersecurity as:</p>
                <ul className="space-y-2">
                  {['An expense to minimize', 'A compliance burden to endure', 'An IT department problem'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400 mt-4 mb-2">And they see AI as:</p>
                <ul className="space-y-2">
                  {['Hype they can\'t trust', 'Risky and uncontrollable', 'Overwhelming to implement'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-midnight rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 gradient-text">The Shift</h3>
                <p className="text-gray-400 mb-6">Security + AI = <strong className="text-white">Growth Acceleration Engine</strong></p>
                <div className="space-y-5">
                  {[
                    { num: '1', title: 'Protect the Foundation', desc: 'Build the security posture that gives you confidence to move fast.' },
                    { num: '2', title: 'Reduce Operational Friction', desc: 'Eliminate inefficiencies so your team focuses on what matters.' },
                    { num: '3', title: 'Propel Growth with Strategic AI', desc: 'Deploy AI as a competitive weapon — securely and profitably.' },
                  ].map(({ num, title, desc }) => (
                    <div key={num} className="flex gap-4 items-start">
                      <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center font-bold text-sm shrink-0">{num}</div>
                      <div>
                        <p className="font-bold text-white">{title}</p>
                        <p className="text-gray-400 text-sm mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SPEAKING TOPICS ─── */}
      <section id="topics" className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Speaking Topics</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Talks That Move the Room</h2>
              <p className="mt-4 text-gray-400 text-lg">Each topic is customizable to your audience, industry, and event format.</p>
            </div>
          </Reveal>
          <div className="space-y-5">
            {TOPICS.map((topic) => (
              <Reveal key={topic.num}>
                <TopicCard {...topic} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-center text-gray-500 text-sm mt-8">
              All topics available in 30, 45, or 60-minute formats. Custom topics available upon request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── WHY BOOK KEN ─── */}
      <section className="py-16 sm:py-24 bg-surface text-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-accent-dark text-sm font-semibold tracking-wider uppercase mb-3">For Event Planners</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight">Why Event Planners Book Ken</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: MicIcon, title: 'Engaging Delivery', desc: 'Analogy-driven storytelling that makes complex topics click. No death-by-PowerPoint.' },
              { icon: LightIcon, title: 'Practical Takeaways', desc: 'Every audience member leaves with specific, actionable steps — not vague inspiration.' },
              { icon: UsersIcon, title: 'Executive-Friendly', desc: 'Speaks the language of business leaders. No jargon, no fear-mongering, all substance.' },
              { icon: ShieldIcon, title: 'Compliance Credibility', desc: 'CISM certified, HCCA speaker, published author. Your audience trusts the source.' },
              { icon: ChartIcon, title: 'Tailored to Your Audience', desc: 'Every presentation is customized to audience maturity level, industry, and event goals.' },
              { icon: StarIcon, title: 'Interactive & Energizing', desc: 'Promotes audience interaction. Leaves the room energized, not overwhelmed.' },
            ].map(({ icon: IconComp, title, desc }) => (
              <Reveal key={title}>
                <div className="light-card rounded-2xl p-6 h-full">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5 text-accent-dark" />
                  </div>
                  <h3 className="font-bold text-midnight mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-16 sm:py-24 bg-midnight-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Testimonials</p>
              <h2 className="text-3xl sm:text-4xl font-bold">What People Say</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map(({ quote, name, org }, i) => (
              <Reveal key={i}>
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <StarIcon key={j} className="w-4 h-4 text-gold-light" />)}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">"{quote}"</p>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-gray-500 text-xs">{org}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPEAKING FORMATS ─── */}
      <section className="py-16 sm:py-24 bg-surface text-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-accent-dark text-sm font-semibold tracking-wider uppercase mb-3">Formats</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight">Speaking Formats</h2>
              <p className="mt-4 text-gray-500 text-lg">Flexible delivery for any event type or audience size.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FORMATS.map(({ name, desc, icon: IconComp }) => (
              <Reveal key={name}>
                <div className="light-card rounded-xl p-5 flex items-start gap-4">
                  <IconComp className="w-6 h-6 text-accent-dark shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-midnight text-sm">{name}</h3>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MEDIA KIT ─── */}
      <section id="media-kit" className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
              <DownloadIcon className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Speaker Media Kit</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-6">
                Everything you need to promote Ken's appearance — high-res headshots, bios, topic summaries, AV requirements, and introduction scripts.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto mb-8 text-left">
                {[
                  'High-res headshots',
                  'Short & long bios',
                  'Topic summaries',
                  'AV requirements',
                  'Emcee intro script',
                  'Logo files',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckIcon className="w-4 h-4 text-accent shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <a href="/Ken-Satkunam-Speaker-Kit.pdf" download className="btn-accent inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl cursor-pointer">
                <DownloadIcon className="w-5 h-5" />
                Download Media Kit (PDF)
              </a>
              <p className="text-gray-600 text-xs mt-3">PDF · Includes all assets</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA / CONTACT ─── */}
      <section id="contact" className="py-16 sm:py-24 bg-midnight-light relative overflow-hidden">
        <div className="absolute top-10 left-[20%] w-80 h-80 bg-accent/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-[20%] w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold">Bring Protect to Propel™<br/>to Your Audience</h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              Whether it's a keynote, workshop, or private briefing — Ken delivers practical, executive-level content that moves the room.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <PopupButton
                url={CALENDLY_URL}
                rootElement={document.getElementById('root')}
                text="Request Availability →"
                className="btn-accent text-white font-bold px-8 py-4 rounded-xl text-lg cursor-pointer"
              />
              <a href={`mailto:${EMAIL}`} className="btn-outline inline-flex items-center justify-center gap-2 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg">
                <MailIcon className="w-5 h-5" />
                {EMAIL}
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-accent" />
                <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="hover:text-white transition">{PHONE}</a>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-accent" />
                <span>Booking Contact: <strong className="text-gray-300">Noah Satkunam</strong></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 bg-midnight border-t border-white/5 text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Ken Satkunam · NorthStar Technology Group · Fargo, ND</div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="hover:text-accent transition">{EMAIL}</a>
            <span className="text-white/10">·</span>
            <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="hover:text-accent transition">{PHONE}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─── Topic Card ─── */
function TopicCard({ num, title, tag, audience, duration, desc, takeaways, icon: IconComp }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-accent/30' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 flex items-center gap-5 text-left">
        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
          {num}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <span className="text-xs font-semibold bg-accent/15 text-accent px-2.5 py-0.5 rounded-full">{tag}</span>
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1"><UsersIcon className="w-3.5 h-3.5" />{audience}</span>
            <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" />{duration}</span>
          </div>
        </div>
        <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 pt-0">
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Takeaways</p>
          <ul className="space-y-1.5">
            {takeaways.map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckIcon className="w-4 h-4 text-accent shrink-0 mt-0.5" />{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
