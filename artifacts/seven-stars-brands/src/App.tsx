import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowRight, Menu, X, Mail, Phone, MapPin, Clock3, Check } from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const BASE = import.meta.env.BASE_URL;
const asset = (name: string) => `${BASE}assets/${name}`;
const email = 'brandsevenstar@gmail.com';
const phone = '+254 722 408777';

type Programme = {
  slug: string;
  title: string;
  group: string;
  audience: string;
  duration: string;
  benefit: string;
};

const programmes: Programme[] = [
  { slug: 'ai-cross-functional-teams', title: 'AI for Cross Functional Teams: Building an AI ready Culture', group: 'AI and Digital Readiness', audience: 'Office administrators, executive assistants', duration: '5 days', benefit: 'Build AI readiness and practical cross functional capability.' },
  { slug: 'mental-health-staff-performance', title: 'Mental Health and Quotients: Staff Performance and Service Delivery', group: 'Wellbeing and Emotional Intelligence', audience: 'Office administrators, executive assistants', duration: '5 days', benefit: 'Strengthen employee wellbeing, emotional intelligence and workplace effectiveness.' },
  { slug: 'mental-health-management-cohort', title: 'Mental Health and Quotients: Management Cohort', group: 'Wellbeing and Emotional Intelligence', audience: 'Senior and performance managers, managers, project supervisors', duration: '5 days', benefit: 'Strengthen employee wellbeing, emotional intelligence and workplace effectiveness.' },
  { slug: 'psychosocial-training-workplace', title: 'Psychosocial Training Intervention in the Workplace', group: 'Wellbeing and Emotional Intelligence', audience: 'Managers, senior planners, performance managers, team leads', duration: '5 days', benefit: 'Strengthen employee wellbeing, emotional intelligence and workplace effectiveness.' },
  { slug: 'project-contract-management-public-sector', title: 'Effective Project and Contract Management for the Public Sector', group: 'Projects and Strategy', audience: 'Managers, project leads, M and E teams, contract managers', duration: '5 days', benefit: 'Improve public sector project and contract management discipline.' },
  { slug: 'monitoring-evaluation-strategic-plans', title: 'Monitoring and Evaluation of Strategic Plans (BIDMESP Model)', group: 'Projects and Strategy', audience: 'Senior and middle managers, organizational performance leaders', duration: '5 days', benefit: 'Support performance monitoring, strategic plan implementation and service delivery.' },
  { slug: 'executive-secretarial-skills', title: 'Executive Secretarial Skills and Emotional Intelligence', group: 'Service and Administration', audience: 'Office administrators, executive assistants', duration: '5 days', benefit: 'Enhance customer experience and executive administrative support.' },
  { slug: 'customer-experience-service-delivery', title: 'Customer Experience and Service Delivery Effectiveness', group: 'Service and Administration', audience: 'Staff across management levels', duration: '2 days', benefit: 'Enhance customer experience and executive administrative support.' },
];

type Credential = { title: string; issuer: string; year: string; image: string; description: string };
const credentials: Credential[] = [
  { title: 'Registered Utility Model No. 429', issuer: 'Kenya Industrial Property Institute', year: '2023', image: 'utility-model-429.jpg', description: 'Certificate of registration of utility model 429: A Location Based System for Conducting Learning Sessions. Filed 3 March 2023, registered 16 May 2023.' },
  { title: 'Copyright RZ52023: Strategic Plan Implementation, The Trophy Model', issuer: 'Kenya Copyright Board', year: '', image: 'copyright-trophy-model.jpg', description: 'Copyright registration for Strategic Plan Implementation, The Trophy Model, number RZ52023.' },
  { title: 'Copyright RZ52071: Business Intelligence Dashboard Monitoring Evaluation of Strategic Plans (BIDMESP)', issuer: 'Kenya Copyright Board', year: '', image: 'copyright-bidm.es.p.jpg', description: 'Copyright registration for Business Intelligence Dashboard Monitoring Evaluation of Strategic Plans (BIDMESP), number RZ52071.' },
  { title: 'Everything DiSC Certified Practitioner', issuer: 'Wiley', year: '2024', image: 'everything-disc.jpg', description: 'Everything DiSC Certified Practitioner credential from Wiley, 2024.' },
  { title: 'Five Behaviors Certified Practitioner', issuer: 'Wiley', year: '2024', image: 'five-behaviors.jpg', description: 'Five Behaviors Certified Practitioner credential from Wiley, 2024.' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);
  const links = [
    { href: '/programmes', label: 'Programmes' },
    { href: '/about#method', label: 'Our Method' },
    { href: '/credentials', label: 'Credentials' },
    { href: '/about#clients', label: 'Clients' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="Seven Stars Brands home"><img src={asset('seven-stars-logo.png')} alt="Seven Stars Brands" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(link => <Link key={link.label} href={link.href} className={`nav-link ${location === link.href ? 'active' : ''}`}>{link.label}</Link>)}
      </nav>
      <Link href="/contact" className="btn btn-primary header-cta">Book a consultation <ArrowRight size={16} /></Link>
      <button className="mobile-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {open && <div className="mobile-menu" id="mobile-navigation">
      <nav aria-label="Mobile navigation">{links.map(link => <Link key={link.label} href={link.href} className="nav-link">{link.label}</Link>)}</nav>
      <Link href="/contact" className="btn btn-primary">Book a consultation <ArrowRight size={16} /></Link>
    </div>}
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-about">
          <Link href="/" className="footer-brand"><img src={asset('seven-stars-logo.png')} alt="Seven Stars Brands" /></Link>
          <p>Learning, Performance and Organizational Development Consultants. Practical training for teams and institutions in Kenya.</p>
        </div>
        <div><h3>Explore</h3><div className="footer-links">
          <Link href="/programmes">Programmes</Link><Link href="/about">About us</Link><Link href="/credentials">Credentials</Link><Link href="/contact">Contact</Link>
        </div></div>
        <div><h3>Talk with us</h3><div className="footer-links">
          <a href={`mailto:${email}`}>{email}</a><a href="tel:+254722408777">{phone}</a><Link href="/contact">Enquiry form</Link>
        </div></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Seven Stars Brands Ltd.</span><span>Learning, Performance and Organizational Development Consultants</span></div>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const pageTitle = `${title} | Seven Stars Brands`;
    document.title = pageTitle;

    const setMeta = (selector: string, attribute: string, key: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(selector);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [title, description]);
  return null;
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="lead">{children}</p>}</div>;
}

function ProgrammeCard({ programme }: { programme: Programme }) {
  return <article className="programme-card">
    <div className="chips-line"><span className="chip">{programme.group}</span></div>
    <h3>{programme.title}</h3>
    <p>For {programme.audience.toLowerCase()}.</p>
    <div className="card-bottom"><span className="chip">{programme.duration}</span><Link href={`/programmes/${programme.slug}`} className="text-link">View programme <span><ArrowRight size={16} /></span></Link></div>
  </article>;
}

function ClientsStrip() {
  return <section className="client-strip" aria-label="Organizations we have worked with">
    <div className="container"><p className="client-label">Organizations we have worked with</p></div>
    <div className="client-track-wrap"><div className="client-track"><span className="client-wordmark">KenGen</span><span className="client-wordmark">REREC</span><span className="client-wordmark">Tourism Fund</span></div></div>
  </section>;
}

function MethodSection() {
  const focusAreas = ['Strategic planning', 'Financial alignment', 'Human resources alignment', 'Marketing engagement'];
  return <section className="section">
    <div className="container method-layout">
      <div className="method-panel">
        <p className="eyebrow">Our method</p><h2>Learning grounded in the real world.</h2>
        <p>Our location based learning approach brings practical sessions into the places where teams work and make decisions. GPS and augmented reality are used in sessions to make learning active and connected to context.</p>
        <div className="method-number"><Check size={18} /> Registered Utility Model No. 429</div>
      </div>
      <div className="focus-list">{focusAreas.map((area, index) => <div className="focus-item" key={area}><span>0{index + 1}</span><strong>{area}</strong></div>)}</div>
    </div>
  </section>;
}

function CredentialGallery({ limit }: { limit?: number }) {
  const [selected, setSelected] = useState<Credential | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const shown = limit ? credentials.slice(0, limit) : credentials;
  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelected(null); return; }
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    };
  }, [selected]);
  return <>
    <div className="credential-row">
      {shown.map(item => <button key={item.title} className="credential-card" type="button" onClick={event => { triggerRef.current = event.currentTarget; setSelected(item); }} aria-label={`View certificate: ${item.title}. ${item.description}`}>
        <div className="certificate-thumb"><img src={asset(item.image)} alt={item.description} loading="lazy" /></div>
        <div className="credential-info"><strong>{item.title}</strong><span>{item.issuer}{item.year ? ` · ${item.year}` : ''}</span></div>
      </button>)}
    </div>
    {selected && <div className="lightbox" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="lightbox-panel" role="dialog" aria-modal="true" aria-label={selected.title}>
        <button ref={closeRef} className="lightbox-close" type="button" aria-label="Close certificate" onClick={() => setSelected(null)}><X size={24} /></button>
        <img className="lightbox-img" src={asset(selected.image)} alt={selected.description} />
        <div className="lightbox-caption"><strong>{selected.title}</strong> · {selected.issuer}{selected.year ? ` · ${selected.year}` : ''}<br />{selected.description}</div>
      </div>
    </div>}
  </>;
}

type FormProps = { programme?: string; compact?: boolean };
function EnquiryForm({ programme, compact }: FormProps) {
  const [error, setError] = useState('');
  const [handoff, setHandoff] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const address = String(data.get('email') || '').trim();
    const organization = String(data.get('organization') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) || message.length < 10) {
      setError('Please enter your name, a valid email address and a message of at least 10 characters.');
      return;
    }
    setError('');
    const subject = programme ? `Programme enquiry: ${programme}` : 'Enquiry for Seven Stars Brands';
    const body = `Hello Seven Stars Brands,\n\n${message}\n\nName: ${name}\nEmail: ${address}${organization ? `\nOrganization: ${organization}` : ''}${programme ? `\nProgramme: ${programme}` : ''}`;
    setHandoff(true);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return <form className="contact-card form-grid" onSubmit={submit} noValidate>
    {programme && <input type="hidden" name="programme" value={programme} />}
    <div className="field"><label htmlFor={compact ? 'name-compact' : 'name'}>Your name</label><input id={compact ? 'name-compact' : 'name'} name="name" required autoComplete="name" /></div>
    <div className="field"><label htmlFor={compact ? 'email-compact' : 'email'}>Email address</label><input id={compact ? 'email-compact' : 'email'} name="email" type="email" required autoComplete="email" /></div>
    <div className="field"><label htmlFor={compact ? 'organization-compact' : 'organization'}>Organization <span style={{ fontWeight: 400, color: 'var(--slate)' }}>(optional)</span></label><input id={compact ? 'organization-compact' : 'organization'} name="organization" autoComplete="organization" /></div>
    <div className="field"><label htmlFor={compact ? 'message-compact' : 'message'}>How can we help?</label><textarea id={compact ? 'message-compact' : 'message'} name="message" required minLength={10} placeholder={programme ? 'Tell us about your team and what you would like to discuss.' : 'Tell us about your team and the support you are looking for.'} /></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {handoff && <p className="form-success" role="status" style={{ display: 'block' }}>Your email app should open with your enquiry prepared. Review it and press send there; this website does not send the message.</p>}
    <button className="btn btn-primary" type="submit">Prepare email enquiry <ArrowRight size={17} /></button>
    <p className="form-help">This form opens your email app with a prepared message. Your enquiry is not sent until you send it from your email app.</p>
  </form>;
}

function Home() {
  const groups = [...new Set(programmes.map(item => item.group))];
  return <Shell>
    <PageMeta title="Practical team training" description="Seven Stars Brands helps public and private institutions in Kenya improve team capability through practical learning and organizational development." />
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Learning, Performance and Organizational Development Consultants</p>
        <h1>Training that helps your team <span className="blue-word">plan, deliver</span> and perform.</h1>
        <p className="lead">Seven Stars Brands runs practical programmes in AI readiness, wellbeing, project delivery, strategic monitoring and customer service.</p>
        <div className="hero-actions"><Link className="btn btn-primary" href="/contact">Book a consultation <ArrowRight size={17} /></Link><Link className="btn btn-secondary" href="/programmes">View programmes</Link></div>
      </div>
      <div className="hero-visual"><img src={asset('training-workshop.jpg')} alt="Kenyan professionals discussing ideas together during a training workshop" fetchPriority="high" />
        <div className="floating-credential"><span className="credential-mark">429</span><div><strong>Registered Utility Model No. 429</strong><small>Location based learning system</small></div></div>
      </div>
    </div></section>
    <section className="container" aria-label="Seven Stars Brands at a glance">
      <div className="stats"><div className="stat"><div className="big-stat">20+</div><p>years of experience</p></div><div className="stat"><div className="big-stat">8</div><p>professional programmes</p></div><div className="stat"><div className="big-stat">2 / 5</div><p>day programme formats</p></div><div className="stat"><div className="big-stat">3</div><p>registered intellectual property items</p></div></div>
    </section>
    <ClientsStrip />
    <section className="section mist"><div className="container">
      <SectionHeading eyebrow="Programmes" title={<>Practical learning for <span className="blue-word">stronger teams.</span></>}><>Eight professional development interventions for management and operational staff. Each programme runs for two or five days.</></SectionHeading>
      <div className="programmes-groups">{groups.map(group => {
        const items = programmes.filter(item => item.group === group);
        return <div className="group-block" key={group}>
          <div className="group-title"><h3>{group}</h3><span className="group-count">{String(items.length).padStart(2, '0')}</span></div>
          {items.map(item => <div className="group-item" key={item.slug}><Link href={`/programmes/${item.slug}`}>{item.title}</Link><p>{item.duration} · {item.audience}</p></div>)}
        </div>;
      })}</div>
      <div style={{ marginTop: 28 }}><Link href="/programmes" className="text-link">Explore all eight programmes <span><ArrowRight size={16} /></span></Link></div>
    </div></section>
    <MethodSection />
    <section className="section blue-tint"><div className="container">
      <SectionHeading eyebrow="Credentials" title={<>Registered work. <span className="blue-word">Verified credentials.</span></>}><>A selection of intellectual property registrations and practitioner certifications.</></SectionHeading>
      <CredentialGallery limit={5} />
      <div style={{ marginTop: 24 }}><Link href="/credentials" className="text-link">View all credentials <span><ArrowRight size={16} /></span></Link></div>
    </div></section>
    <section className="section"><div className="container ceo-layout">
      <img className="ceo-photo" src={asset('dr-uvyu-mbole.jpg')} alt="Dr. Uvyu Mbole, CEO of Seven Stars Brands Ltd." loading="lazy" />
      <div className="ceo-copy"><p className="eyebrow">Meet the CEO</p><h2>Dr. Uvyu Mbole</h2><p className="ceo-title">CEO, Seven Stars Brands Ltd.</p>
        <p>Dr. Uvyu Mbole is a strategic planning and organizational development specialist with more than 20 years of experience across university management, executive education and consulting. He designs and delivers training for public and private institutions in Kenya, and is the registered inventor of the location based learning system behind Seven Stars Brands sessions.</p>
        <p><strong>DBA, MSc in Management and Organizational Development, BA in Psychology.</strong></p>
        <div className="quick-facts"><div className="quick-fact">Over 20 years of experience</div><div className="quick-fact">Strategic planning, organizational design and executive education</div><div className="quick-fact">Registered inventor of the location based learning system</div></div>
        <div style={{ marginTop: 20 }}><Link href="/about" className="text-link">More about Seven Stars Brands <span><ArrowRight size={16} /></span></Link></div>
      </div>
    </div></section>
    <section className="cta-band"><div className="container cta-layout">
      <div><p className="eyebrow">Start a conversation</p><h2>Tell us about your team.</h2><p className="lead">Tell us about your team and we will suggest the right programme.</p>
        <div className="contact-details"><a href={`mailto:${email}`}><Mail size={17} /> {email}</a><a href="tel:+254722408777"><Phone size={17} /> {phone}</a></div>
      </div><EnquiryForm compact />
    </div></section>
  </Shell>;
}

function ProgrammesPage() {
  const groups = [...new Set(programmes.map(item => item.group))];
  const audiences = [...new Set(programmes.map(item => item.audience))];
  const [group, setGroup] = useState('All groups');
  const [audience, setAudience] = useState('All audiences');
  const visible = programmes.filter(item => (group === 'All groups' || item.group === group) && (audience === 'All audiences' || item.audience === audience));
  return <Shell>
    <PageMeta title="Professional programmes" description="Browse eight practical professional development programmes from Seven Stars Brands, with group and audience filters." />
    <section className="page-hero"><div className="container"><p className="crumb">Programmes</p><p className="eyebrow">Professional development</p><h1>Practical programmes for teams that do the work.</h1><p className="lead">Eight professional development interventions for management and operational staff. Programme duration is two or five days.</p></div></section>
    <section className="section"><div className="container">
      <div className="filters" aria-label="Filter programmes">
        <div className="filter-line"><span className="filter-label">By group</span><div className="filter-options">{['All groups', ...groups].map(value => <button type="button" key={value} className="filter-chip" aria-pressed={group === value} onClick={() => setGroup(value)}>{value}</button>)}</div></div>
        <div className="filter-line"><span className="filter-label">By audience</span><div className="filter-options">{['All audiences', ...audiences].map(value => <button type="button" key={value} className="filter-chip" aria-pressed={audience === value} onClick={() => setAudience(value)}>{value}</button>)}</div></div>
      </div>
      <p className="results-count" aria-live="polite">Showing {visible.length} {visible.length === 1 ? 'programme' : 'programmes'}</p>
      {visible.length ? <div className="programme-grid">{visible.map(programme => <ProgrammeCard key={programme.slug} programme={programme} />)}</div> : <div className="contact-card"><h2>No programmes match these filters.</h2><p>Choose a different group or audience to see available programmes.</p><button className="btn btn-secondary" onClick={() => { setGroup('All groups'); setAudience('All audiences'); }}>Clear filters</button></div>}
    </div></section>
  </Shell>;
}

function ProgrammeDetail() {
  const params = useParams<{ slug: string }>();
  const programme = programmes.find(item => item.slug === params.slug);
  if (!programme) return <NotFound />;
  return <Shell>
    <PageMeta title={programme.title} description={`${programme.benefit} ${programme.duration}. Full programme outline available on request.`} />
    <section className="page-hero"><div className="container"><p className="crumb"><Link href="/programmes">Programmes</Link> / Programme details</p><p className="eyebrow">{programme.group}</p><h1>{programme.title}</h1><p className="lead">{programme.benefit}</p></div></section>
    <section className="section"><div className="container detail-layout">
      <div className="detail-content">
        <p className="eyebrow">Programme overview</p><h2>Practical development for your team.</h2>
        <p>This programme is one of Seven Stars Brands' professional development interventions designed to strengthen organizational capability. The full outline is available on request.</p>
        <div className="detail-section"><h2>Who it is for</h2><p className="audience-list">{programme.audience}.</p></div>
        <div className="detail-section"><h2>What teams take away</h2><p>{programme.benefit}</p><p>The detailed programme outline is available on request. We do not publish learning outcomes that have not been confirmed.</p></div>
        <div className="request-inline"><h2>Request this programme</h2><p className="lead">Tell us about your team and we will follow up by email.</p><EnquiryForm programme={programme.title} /></div>
      </div>
      <aside className="detail-aside"><p className="eyebrow">At a glance</p><h3>{programme.title}</h3><span className="duration"><Clock3 size={17} /> Duration: {programme.duration}</span><span className="duration">Audience: {programme.audience}</span><p style={{ marginTop: 20, color: 'var(--slate)', fontSize: 14, lineHeight: 1.6 }}>Full programme outline available on request.</p></aside>
    </div></section>
  </Shell>;
}

function AboutPage() {
  return <Shell>
    <PageMeta title="About the firm" description="Learn about Seven Stars Brands, its location based learning method, focus areas and CEO Dr. Uvyu Mbole." />
    <section className="page-hero"><div className="container"><p className="crumb">About</p><p className="eyebrow">About Seven Stars Brands</p><h1>Capability grows through practical learning.</h1><p className="lead">We help public and private institutions improve team capability through practical training, performance and organizational development.</p></div></section>
    <section className="section"><div className="container about-intro">
      <div><p className="eyebrow">The firm</p><h2>Learning for the work ahead.</h2><p className="lead">Seven Stars Brands Ltd. is a Kenya-based learning, performance and organizational development consultancy. We design and deliver professional development programmes for management and operational staff.</p><p className="lead">Our programmes address AI readiness, wellbeing, project and contract management, strategic plan monitoring, executive administration and customer experience.</p><p className="lead">Seven Stars Brands developed training programmes for KenGen, REREC and Tourism Fund, and delivered governance and strategic planning workshops under the World Bank funded KIEP 250 project for public and private institutions.</p><div className="clients-about" id="clients"><span>KenGen</span><span>REREC</span><span>Tourism Fund</span></div></div>
      <div className="about-photo-wrap"><img src={asset('training-workshop.jpg')} alt="A group of Kenyan professionals in discussion at a training session" loading="lazy" /></div>
    </div></section>
    <section className="section mist" id="method"><div className="container"><MethodSection /></div></section>
    <section className="section"><div className="container ceo-layout">
      <img className="ceo-photo" src={asset('dr-uvyu-mbole.jpg')} alt="Dr. Uvyu Mbole, CEO of Seven Stars Brands Ltd." loading="lazy" />
      <div className="ceo-copy"><p className="eyebrow">Chief Executive Officer</p><h2>Dr. Uvyu Mbole</h2><p className="ceo-title">CEO, Seven Stars Brands Ltd.</p><p>Dr. Uvyu Mbole is a strategic planning and organizational development specialist with more than 20 years of experience across university management, executive education and consulting. He designs and delivers training for public and private institutions in Kenya, and is the registered inventor of the location based learning system behind Seven Stars Brands sessions.</p><p><strong>DBA, MSc in Management and Organizational Development, BA in Psychology.</strong></p><div className="quick-facts"><div className="quick-fact">Over 20 years of experience</div><div className="quick-fact">Strategic planning, organizational design and executive education</div><div className="quick-fact">Registered inventor of the location based learning system</div></div></div>
    </div></section>
  </Shell>;
}

function CredentialsPage() {
  return <Shell><PageMeta title="Credentials" description="View five verified intellectual property registrations and practitioner credentials for Seven Stars Brands." /><section className="page-hero"><div className="container"><p className="crumb">Credentials</p><p className="eyebrow">Verified credentials</p><h1>Registered work and practitioner credentials.</h1><p className="lead">View the certificates and registrations held by Seven Stars Brands and its CEO.</p></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Certificate gallery" title={<>A record of work and <span className="blue-word">practice.</span></>}><>Select a certificate to open a larger image. Use Escape to close it.</></SectionHeading><CredentialGallery /></div></section>
  </Shell>;
}

function ContactPage() {
  return <Shell><PageMeta title="Contact" description="Contact Seven Stars Brands by email, phone or a validated enquiry form that prepares an email for you to send." /><section className="page-hero"><div className="container"><p className="crumb">Contact</p><p className="eyebrow">Start a conversation</p><h1>Tell us about your team.</h1><p className="lead">Share the capability you want to strengthen. We will suggest a useful next step.</p></div></section>
    <section className="section"><div className="container contact-layout">
      <div><p className="eyebrow">Get in touch</p><h2>Talk with Seven Stars Brands.</h2><p className="lead">Use the enquiry form or contact us directly by email or phone.</p>
        <div className="contact-list">
          <div className="contact-detail"><small><Mail size={16} /> Email</small><a href={`mailto:${email}`}>{email}</a></div>
          <div className="contact-detail"><small><Phone size={16} /> Phone</small><a href="tel:+254722408777">{phone}</a></div>
          <div className="contact-detail"><small><MapPin size={16} /> Based in</small><span>Kenya</span></div>
        </div>
        <div className="map-placeholder"><div><MapPin size={24} /><p style={{ margin: '8px 0 0' }}>Seven Stars Brands works with public and private institutions in Kenya.</p></div></div>
      </div>
      <div><EnquiryForm /></div>
    </div></section>
  </Shell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/programmes" component={ProgrammesPage} />
    <Route path="/programmes/:slug" component={ProgrammeDetail} />
    <Route path="/about" component={AboutPage} />
    <Route path="/credentials" component={CredentialsPage} />
    <Route path="/contact" component={ContactPage} />
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}>
    <TooltipProvider><WouterRouter base={BASE.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider>
  </QueryClientProvider>;
}

export default App;
