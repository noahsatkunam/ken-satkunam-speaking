import { useState, useEffect, useRef } from 'react'
import { PopupButton } from 'react-calendly'

const CALENDLY_URL = 'https://calendly.com/PLACEHOLDER/speaking-inquiry'
const EMAIL = 'info@northstar-tg.com'
const PHONE = '(701) 237-9096'

/* Images */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80&fit=crop',
  speaking: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&fit=crop',
  cyber: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80&fit=crop',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&fit=crop',
  business: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&fit=crop',
  healthcare: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&fit=crop',
}

/* Scroll reveal */
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

/* Icons */
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

/* Data */
const TOPICS = [
  { num: '01', title: 'Protect to Propel™', tag: 'Flagship Keynote', audience: 'Executives & Business Owners', duration: '30 / 45 / 60 min', desc: 'Most organizations treat cybersecurity as a cost center and AI as hype. This keynote flips both — showing leaders how security and AI become a strategic growth engine when aligned with business objectives.', takeaways: ['Reframe security from expense to competitive advantage', 'Practical AI use cases you can implement this quarter', 'The 3-pillar framework: Protect → Reduce Friction → Propel Growth'], icon: RocketIcon },
  { num: '02', title: 'The New HIPAA Reality', tag: 'Healthcare Focus', audience: 'Healthcare IT & Compliance', duration: '30 / 45 / 60 min', desc: 'HIPAA enforcement is intensifying. This talk gives healthcare leaders a clear, actionable roadmap for regulatory readiness — without the jargon or paralysis.', takeaways: ['Current enforcement trends and what they mean for you', 'Risk assessment essentials for non-IT professionals', 'Step-by-step compliance roadmap'], icon: ShieldIcon },
  { num: '03', title: 'AI for SMB Leaders', tag: 'Practical & Profitable', audience: 'Business Owners & Operators', duration: '30 / 45 / 60 min', desc: 'Cut through the AI noise. This session delivers 10-20 real use cases that SMBs can implement immediately — securely, practically, and profitably.', takeaways: ['10-20 actionable AI use cases for your business', 'How to evaluate AI tools without the hype', 'Security guardrails for safe AI adoption'], icon: LightIcon },
  { num: '04', title: 'Cyber Incident Readiness', tag: 'Crisis Preparedness', audience: 'Executive & IT Leadership', duration: '30 / 45 / 60 min', desc: 'If you\'re breached tomorrow, is your team ready? This talk replaces panic with a clear, rehearsed game plan — from detection through recovery.', takeaways: ['Incident response plan essentials', 'First 72 hours: what to do (and not do)', 'Cyber insurance and legal considerations'], icon: ShieldIcon },
  { num: '05', title: 'From IT Support to Strategic Advantage', tag: 'MSP & IT Leadership', audience: 'MSPs & IT Directors', duration: '30 / 45 / 60 min', desc: 'Technology should drive the business — not just keep the lights on. This session provides an operational maturity framework for IT leaders ready to level up.', takeaways: ['Operational maturity assessment framework', 'Moving from reactive to strategic IT', 'Building executive-level influence as a tech leader'], icon: ChartIcon },
]

const TESTIMONIALS = [
  { quote: "NorthStar Technology Group has surpassed expectations to not only rapidly respond to helpdesk needs from staff but also effectively work with us to resolve IT security and HIPAA risks in a timely manner.", name: "Director of Human Resources", org: "St. Luke's Healthcare" },
  { quote: "Managing technology for 200 employees in five locations with many remote employees is a difficult task. NorthStar Technology Group provides the tools and people to make this job so much easier.", name: "Lynn, Chief Financial Officer", org: "Lakeland Mental Health Services" },
  { quote: "NorthStar Technology Group doesn't assume I know all the information technology lingo; they make recommendations that are easy to understand and practical to our business.", name: "Chief Financial Officer", org: "Gary Cavett and Company CPAs" },
  { quote: "Ken is compassionate and has great integrity, always striving to do the right thing for his clients and in his business partnerships.", name: "Industry Partner", org: "LinkedIn Recommendation" },
]

const FORMATS = [
  { name: 'Keynotes', desc: 'High-energy, main-stage presentations', icon: MicIcon },
  { name: 'Breakout Sessions', desc: 'Interactive sessions for smaller groups', icon: UsersIcon },
  { name: 'Panel Discussions', desc: 'Expert perspective alongside industry leaders', icon: UsersIcon },
  { name: 'Webinars', desc: 'Virtual presentations for distributed teams', icon: LightIcon },
  { name: 'Executive Workshops', desc: 'Hands-on sessions for leadership teams', icon: BookIcon },
  { name: 'Board Briefings', desc: 'Confidential strategy sessions for C-suites', icon: ShieldIcon },
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
    <div className="min-h-screen bg-cream text-text font-sans antialiased">

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#" className={`font-bold text-lg tracking-tight transition ${scrolled ? 'text-navy' : 'text-white'}`}>
            Ken <span className={scrolled ? 'text-gold' : 'text-gold-light'}>Satkunam</span>
          </a>
          <div className={`hidden md:flex items-center gap-7 text-sm font-medium ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
            <a href="#about" className="hover:text-gold transition">About</a>
            <a href="#keynote" className="hover:text-gold transition">Keynote</a>
            <a href="#topics" className="hover:text-gold transition">Topics</a>
            <a href="#testimonials" className="hover:text-gold transition">Testimonials</a>
            <PopupButton url={CALENDLY_URL} rootElement={document.getElementById('root')} text="Book Ken" className="btn-gold text-white px-5 py-2 rounded-lg font-semibold cursor-pointer text-sm" />
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className={`md:hidden p-2 ${scrolled ? 'text-gray-600' : 'text-white'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {mobileMenu ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4 space-y-1">
            {['About','Keynote','Topics','Testimonials'].map(i => (
              <a key={i} href={`#${i.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block py-3 text-gray-500 hover:text-gold transition text-sm font-medium">{i}</a>
            ))}
            <PopupButton url={CALENDLY_URL} rootElement={document.getElementById('root')} text="Book Ken" className="block w-full btn-gold text-white text-center px-5 py-3 rounded-lg font-semibold cursor-pointer mt-2 text-sm" />
          </div>
        )}
      </nav>

      {/* HERO — full-bleed image */}
      <header className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 py-32">
          <div className="max-w-2xl">
            <div className="gold-divider mb-8 animate-fade-in-up" />
            <p className="text-gold-light text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in-up" style={{animationDelay:'0.05s'}}>
              Cybersecurity & AI Strategist
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white animate-fade-in-up" style={{animationDelay:'0.1s'}}>
              Protect to<br/>Propel™
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed animate-fade-in-up" style={{animationDelay:'0.2s'}}>
              Ken Satkunam helps organizations turn cybersecurity and AI from cost centers into <strong className="text-white">competitive advantages</strong>.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay:'0.3s'}}>
              <PopupButton url={CALENDLY_URL} rootElement={document.getElementById('root')} text="Book Ken for Your Event →" className="btn-gold text-white font-bold px-8 py-4 rounded-xl text-lg cursor-pointer text-center" />
              <a href="#media-kit" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition">
                <DownloadIcon className="w-5 h-5" />
                Speaker Kit
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* CREDENTIAL BAR */}
      <section className="bg-navy text-white py-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: '30+', label: 'Years in IT' },
              { val: '2×', label: 'Inc. 5000 Honoree' },
              { val: '100+', label: 'Organizations Secured' },
              { val: '23K', label: 'Employees Led as CIO' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-extrabold gold-text">{val}</div>
                <div className="text-xs text-white/50 mt-1 font-medium tracking-wide uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="relative">
                <img src={IMG.speaking} alt="Ken Satkunam presenting" className="w-full rounded-2xl shadow-xl" />
                <div className="absolute -bottom-6 -right-6 bg-navy text-white rounded-xl px-6 py-4 shadow-lg hidden sm:block">
                  <p className="text-gold-light text-xs font-bold tracking-widest uppercase">Published Author</p>
                  <p className="text-sm mt-1 text-white/80">Cyber Attack Prevention</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <div className="gold-divider mb-6" />
                <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">About Ken</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy leading-tight">Trusted by Leaders.<br/>Proven in the Field.</h2>
                <div className="mt-6 space-y-4 text-text-light leading-relaxed">
                  <p><strong className="text-navy">Ken Satkunam, CISM</strong> is the CEO and Founder of <strong className="text-navy">NorthStar Technology Group</strong>, a 2× Inc. 5000 cybersecurity and managed IT firm based in Fargo, North Dakota.</p>
                  <p>With 30+ years in information technology — serving as CIO for healthcare organizations as large as 23,000 employees including Banner Health — Ken brings a rare combination of deep technical expertise and executive-level business acumen.</p>
                  <p>Today, NorthStar secures 100+ organizations across healthcare, legal, and financial services. Ken is a published author, HCCA conference speaker, and creator of the <strong className="text-navy">Protect to Propel™</strong> framework.</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['CISM Certified', 'HCCA Speaker', 'Published Author', 'Inc. 5000 2×'].map(tag => (
                    <span key={tag} className="bg-gold/10 text-gold border border-gold/20 text-xs font-semibold px-3 py-1.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SIGNATURE KEYNOTE */}
      <section id="keynote" className="py-20 sm:py-28 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <img src={IMG.ai} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <div className="max-w-2xl">
              <div className="gold-divider mb-6" />
              <p className="text-gold-light text-sm font-semibold tracking-widest uppercase mb-3">Signature Keynote</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Protect to Propel™</h2>
              <p className="mt-4 text-white/60 text-lg">The framework that transforms how leaders think about cybersecurity and AI.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Reveal>
              <div className="dark-card rounded-2xl p-8">
                <h3 className="text-lg font-bold text-red-400 mb-4">The Problem</h3>
                <p className="text-white/50 mb-3 text-sm">Most businesses treat cybersecurity as:</p>
                {['An expense to minimize', 'A compliance burden to endure', 'An IT department problem'].map(i => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm py-1"><span className="w-1.5 h-1.5 bg-red-400 rounded-full" />{i}</div>
                ))}
                <p className="text-white/50 mt-4 mb-3 text-sm">And they see AI as:</p>
                {['Hype they can\'t trust', 'Risky and uncontrollable', 'Overwhelming to implement'].map(i => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm py-1"><span className="w-1.5 h-1.5 bg-red-400 rounded-full" />{i}</div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="dark-card rounded-2xl p-8 border-gold/20">
                <h3 className="text-lg font-bold gold-text mb-4">The Shift</h3>
                <p className="text-white/50 mb-6 text-sm">Security + AI = <strong className="text-white">Growth Acceleration Engine</strong></p>
                {[
                  { n: '1', t: 'Protect the Foundation', d: 'Build security posture that gives you confidence to move fast.' },
                  { n: '2', t: 'Reduce Operational Friction', d: 'Eliminate inefficiencies so your team focuses on what matters.' },
                  { n: '3', t: 'Propel Growth with Strategic AI', d: 'Deploy AI as a competitive weapon — securely and profitably.' },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex gap-4 items-start mb-5 last:mb-0">
                    <div className="w-9 h-9 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center font-bold text-sm text-navy shrink-0">{n}</div>
                    <div>
                      <p className="font-bold text-white text-sm">{t}</p>
                      <p className="text-white/50 text-sm mt-0.5">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SPEAKING TOPICS */}
      <section id="topics" className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">Speaking Topics</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">Talks That Move the Room</h2>
              <p className="mt-4 text-text-light text-lg">Each topic is customizable to your audience, industry, and event format.</p>
            </div>
          </Reveal>
          <div className="space-y-4">
            {TOPICS.map(t => <Reveal key={t.num}><TopicCard {...t} /></Reveal>)}
          </div>
          <Reveal><p className="text-center text-text-light text-sm mt-8">All topics available in 30, 45, or 60-minute formats. Custom topics available upon request.</p></Reveal>
        </div>
      </section>

      {/* IMAGE BREAK — cybersecurity */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img src={IMG.cyber} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <p className="text-2xl sm:text-3xl font-bold text-white text-center max-w-xl px-4">
              "Security isn't a cost center — it's your <span className="gold-text">growth engine</span>."
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHY BOOK KEN */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">For Event Planners</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">Why Event Planners Book Ken</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: MicIcon, title: 'Engaging Delivery', desc: 'Analogy-driven storytelling that makes complex topics click. No death-by-PowerPoint.' },
              { icon: LightIcon, title: 'Practical Takeaways', desc: 'Every audience member leaves with specific, actionable steps — not vague inspiration.' },
              { icon: UsersIcon, title: 'Executive-Friendly', desc: 'Speaks the language of business leaders. No jargon, no fear-mongering, all substance.' },
              { icon: ShieldIcon, title: 'Compliance Credibility', desc: 'CISM certified, HCCA speaker, published author. Your audience trusts the source.' },
              { icon: ChartIcon, title: 'Tailored Content', desc: 'Every presentation customized to audience maturity level, industry, and event goals.' },
              { icon: StarIcon, title: 'Interactive & Energizing', desc: 'Promotes audience interaction. Leaves the room energized, not overwhelmed.' },
            ].map(({ icon: Ic, title, desc }) => (
              <Reveal key={title}>
                <div className="elegant-card rounded-2xl p-6 h-full">
                  <div className="w-11 h-11 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Ic className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">{title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 sm:py-28 bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-gold-light text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
              <h2 className="text-3xl sm:text-4xl font-bold">What People Say</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map(({ quote, name, org }, i) => (
              <Reveal key={i}>
                <div className="dark-card rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <StarIcon key={j} className="w-4 h-4 text-gold-light" />)}</div>
                  <p className="text-white/70 text-sm leading-relaxed flex-1 italic">"{quote}"</p>
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-white/40 text-xs">{org}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKING FORMATS */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">Formats</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">Flexible for Any Event</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FORMATS.map(({ name, desc, icon: Ic }) => (
              <Reveal key={name}>
                <div className="elegant-card rounded-xl p-5 flex items-start gap-4">
                  <Ic className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-navy text-sm">{name}</h3>
                    <p className="text-text-light text-xs mt-1">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA KIT */}
      <section id="media-kit" className="py-20 sm:py-28 bg-warm-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
              <DownloadIcon className="w-10 h-10 text-gold mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Speaker Media Kit</h2>
              <p className="text-text-light max-w-lg mx-auto mb-6">High-res headshots, bios, topic summaries, AV requirements, and emcee introduction scripts.</p>
              <div className="grid sm:grid-cols-2 gap-2 max-w-sm mx-auto mb-8 text-left">
                {['High-res headshots','Short & long bios','Topic summaries','AV requirements','Emcee intro script','Logo files'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text-light"><CheckIcon className="w-4 h-4 text-gold shrink-0" />{item}</div>
                ))}
              </div>
              <a href="/Ken-Satkunam-Speaker-Kit.pdf" download className="btn-gold inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl">
                <DownloadIcon className="w-5 h-5" />
                Download Media Kit (PDF)
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA — image background */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.business} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Reveal>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Bring Protect to Propel™<br/>to Your Audience</h2>
            <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">Keynote, workshop, or private briefing — Ken delivers practical, executive-level content that moves the room.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <PopupButton url={CALENDLY_URL} rootElement={document.getElementById('root')} text="Request Availability →" className="btn-gold text-white font-bold px-8 py-4 rounded-xl text-lg cursor-pointer" />
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition">
                <MailIcon className="w-5 h-5" />{EMAIL}
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-gold" /><a href={`tel:${PHONE.replace(/\D/g,'')}`} className="hover:text-white transition">{PHONE}</a></div>
              <div className="flex items-center gap-2"><UsersIcon className="w-4 h-4 text-gold" /><span>Booking: <strong className="text-white/70">Noah Satkunam</strong></span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-navy border-t border-white/5 text-white/40 text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Ken Satkunam · NorthStar Technology Group · Fargo, ND</div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="hover:text-gold transition">{EMAIL}</a>
            <span className="text-white/10">·</span>
            <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="hover:text-gold transition">{PHONE}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* Topic Card */
function TopicCard({ num, title, tag, audience, duration, desc, takeaways, icon: Ic }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`elegant-card rounded-2xl overflow-hidden ${open ? 'border-gold/40 shadow-lg' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 flex items-center gap-5 text-left">
        <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center font-bold text-sm text-navy shrink-0">{num}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-lg text-navy">{title}</h3>
            <span className="text-xs font-semibold bg-gold/10 text-gold px-2.5 py-0.5 rounded-full border border-gold/20">{tag}</span>
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-text-light">
            <span className="flex items-center gap-1"><UsersIcon className="w-3.5 h-3.5" />{audience}</span>
            <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" />{duration}</span>
          </div>
        </div>
        <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6">
          <p className="text-text-light text-sm leading-relaxed mb-4">{desc}</p>
          <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-2">Key Takeaways</p>
          {takeaways.map(t => (
            <div key={t} className="flex items-start gap-2 text-sm text-text py-1"><CheckIcon className="w-4 h-4 text-gold shrink-0 mt-0.5" />{t}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
