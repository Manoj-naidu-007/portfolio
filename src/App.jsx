import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github, Linkedin, Mail, MapPin, Download, ExternalLink, Menu, X, Sun, Moon,
  ArrowUp, Star, Award, Briefcase, GraduationCap, Terminal, Layers,
  Quote, Send, CheckCircle2, Search, Calendar, Users, Zap, Code2, Database,
  Server, Heart, Target, Compass, ChevronLeft, ChevronRight,
  FolderGit2, Trophy, BadgeCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — swap this out with the real student's info                  */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Manoj C",
  role: "Full-Stack Developer",
  taglineRoles: [
    "MCA Student",
    "Full-Stack Developer",
    "Python & React Engineer",
    "ML Enthusiast",
  ],
  location: "Bengaluru, India",
  email: "manojmanojnaidu007@gmail.com",
  blurb:
    "I build fast, considered software — from Flask APIs to React interfaces — and I like the parts of engineering where a clean data model quietly makes everything downstream easier.",
  socials: {
    github: "https://github.com/Manoj-naidu-007",
    linkedin: "https://www.linkedin.com/in/manoj-naidu-392480325/",
    leetcode: "https://leetcode.com",
    hackerrank: "https://hackerrank.com",
  },
};

const TECH_ORBIT = ["Python", "React", "JS", "Flask", "SQL", "Git", "Firebase", "CSS3"];

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { label: "Projects shipped", value: 12, suffix: "+" },
  { label: "Technologies", value: 12, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "GitHub repos", value: 34, suffix: "+" },
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 78 },
      { name: "HTML / CSS", level: 92 },
    ],
  },
  {
    title: "Frontend",
    icon: Layers,
    items: [
      { name: "React", level: 87 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Bootstrap", level: 80 },
      { name: "Responsive UI", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: "Flask", level: 84 },
      { name: "Node.js", level: 70 },
      { name: "REST APIs", level: 82 },
      { name: "Express", level: 68 },
    ],
  },
  {
    title: "Data & Tools",
    icon: Database,
    items: [
      { name: "Firebase", level: 80 },
      { name: "MySQL", level: 76 },
      { name: "Git / GitHub", level: 88 },
      { name: "Postman", level: 75 },
    ],
  },
];

const SOFT_SKILLS = ["Problem Solving", "Communication", "Leadership", "Time Management", "Teamwork", "Critical Thinking"];

const TIMELINE = [
  {
    type: "education",
    title: "Master of Computer Applications (MCA)",
    org: "Kristu jayanthi university",
    date: "2025 — 2027",
    detail: "Percentage 77.73% · Coursework: Distributed Systems, ML, Advanced Web Engineering.",
  },
  {
    type: "work",
    title: "AI for skilling",
    org: "capgemini, implemented by nasscom foundation",
    date: "July 2025 — sep 2026",
    detail: "Datascience with python.",
  },
  {
    type: "education",
    title: "Bachelor of Computer Applications (BCA)",
    org: "Christ college science and management, Malur",
    date: "2022 — 2026",
    detail: "CGPA 8.0/10 · 2 academic projects.",
  },
  {
    type: "work",
    title: "Software Development Intern",
    org: "Prodigy infoTech",
    date: "Aug 2024 — sep 2024",
    detail: "web developer.",
  },
];

const PROJECTS = [
  {
    id: "eateasy",
    title: "EatEasy",
    tag: "Full Stack",
    tags: ["Full Stack", "Flask", "React"],
    desc: "A campus food-ordering platform with live order tracking and a vendor dashboard.",
    stack: ["React", "Flask", "firestore"],
    features: ["Real-time order status", "Vendor analytics dashboard", "Role-based auth"],
    challenge: "Keeping order state in sync across customer and vendor views without polling.",
    solution: "Introduced a lightweight WebSocket layer with optimistic UI updates on the client.",
    github: "#",
    demo: "#",
  },
  {
    id: "propshare",
    title: "Property Share Investment Platform",
    tag: "Full Stack",
    tags: ["Full Stack", "React", "Finance"],
    desc: "Fractional real-estate investing simulator with portfolio and returns visualisation.",
    stack: ["React", "Flask", "Chart.js", "Firestore"],
    features: ["Fractional share calculator", "Portfolio performance charts", "Risk profile quiz"],
    challenge: "Modelling fractional ownership cleanly in a relational schema.",
    solution: "Normalised holdings into a ledger table, computing balances via views instead of stored totals.",
    github: "https://github.com/Manoj-naidu-007/propertyshare-react",
    demo: "#",
  },
  {
    id: "rice",
    title: "Rice Grain Classification",
    tag: "Machine Learning",
    tags: ["Machine Learning", "Python"],
    desc: "CNN model classifying five rice varieties from grain images, 96.4% test accuracy.",
    stack: ["Python", "TensorFlow", "OpenCV", "Streamlit"],
    features: ["Custom CNN architecture", "Data augmentation pipeline", "Interactive demo UI"],
    challenge: "Small, imbalanced dataset led to early overfitting.",
    solution: "Applied augmentation + class weighting, and used transfer learning from MobileNetV2.",
    github: "https://github.com/Manoj-naidu-007/rice",
    demo: "https://rice-y7pf.onrender.com",
  },
  {
    id: "interview-ai",
    title: "AI Interview Preparation System",
    tag: "Machine Learning",
    tags: ["Machine Learning", "React", "Flask"],
    desc: "Mock-interview tool that scores spoken answers on clarity, pace and keyword coverage.",
    stack: ["React", "Flask", "NLP", "Web Speech API"],
    features: ["Live speech-to-text scoring", "Question bank by role", "Progress dashboard"],
    challenge: "Giving useful feedback from noisy speech-to-text transcripts.",
    solution: "Layered a keyword/semantic-similarity scorer on top of transcript cleanup heuristics.",
    github: "https://github.com/Manoj-naidu-007/gemini-interview-guardian",
    demo: "#",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    tag: "Web",
    tags: ["Web", "React"],
    desc: "This site — a hand-built portfolio focused on motion, hierarchy and detail.",
    stack: ["React", "Custom CSS"],
    features: ["Scroll-driven reveals", "Filterable project grid", "Accessible dark mode"],
    challenge: "Keeping the animation layer light without a motion library.",
    solution: "Wrote a small IntersectionObserver hook and CSS-driven transitions instead.",
    github: "https://github.com/Manoj-naidu-007/portfolio",
    demo: "https://portfolio-8qyy.onrender.com",
  },
  {
    id: "future",
    title: "Next up: Distributed Task Queue",
    tag: "Python",
    tags: ["Python", "Full Stack"],
    desc: "A Redis-backed job queue with a React dashboard for tracing task lifecycles.",
    stack: ["Python", "Redis", "React"],
    features: ["Planned for Sept 2026"],
    challenge: "—",
    solution: "—",
    github: "#",
    demo: "#",
    upcoming: true,
  },
];

const FILTERS = ["All", "Full Stack", "Machine Learning", "Web", "React", "Python"];

const CERTIFICATIONS = [
  { title: "Meta Front-End Developer", issuer: "Coursera · Meta", date: "Mar 2025" },
  { title: "Python for Data Science", issuer: "IBM", date: "Nov 2024" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "Jul 2025" },
];

const ACHIEVEMENTS = [
  { icon: Trophy, title: "Smart India Hackathon — Finalist", desc: "Top 15 of 900+ teams, national round.", year: "2025" },
  { icon: Star, title: "Dept. Topper, BCA", desc: "Highest CGPA in graduating cohort of 120.", year: "2024" },
  { icon: FolderGit2, title: "Open-source contributor", desc: "6 merged PRs across 3 developer-tooling repos.", year: "2025" },
  { icon: Award, title: "Best Capstone Project", desc: "Awarded for the Rice Grain Classification system.", year: "2025" },
];

const TESTIMONIALS = [
  {
    quote: "Manoj shipped the reporting dashboard ahead of schedule and it needed almost no rework — rare for an intern's first project.",
    name: "R. Kapoor",
    title: "Engineering Lead, Nimbus Labs",
  },
  {
    quote: "One of the strongest technical presenters in the cohort. Explains trade-offs clearly, not just what he built but why.",
    name: "Dr. S. Menon",
    title: "Professor, Christ University",
  },
  {
    quote: "Good instincts for product, not just code — he pushed back on a feature and was right to.",
    name: "K. Iyer",
    title: "Founder, PixelForge Studio",
  },
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function useTypingEffect(words, typingSpeed = 65, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), typingSpeed / 1.6);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pause]);

  return text;
}

/* ------------------------------------------------------------------ */
/*  SMALL PRESENTATIONAL PIECES                                        */
/* ------------------------------------------------------------------ */

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  LOADER                                                             */
/* ------------------------------------------------------------------ */

function Loader({ done }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + Math.ceil(Math.random() * 14)));
    }, 110);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`loader ${done ? "loader-hide" : ""}`}>
      <div className="loader-inner">
        <div className="loader-mark">MC</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
        <div className="loader-pct">{Math.min(pct, 100)}%</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                             */
/* ------------------------------------------------------------------ */

function Navbar({ theme, toggleTheme, scrollProgress }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <button className="brand" onClick={() => go("top")}>
            <span className="brand-mark">MC</span>
            <span className="brand-name">Manoj C</span>
          </button>

          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}>{l.label}</button>
            ))}
          </nav>

          <div className="navbar-actions">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="btn btn-primary btn-sm hide-mobile" onClick={() => go("contact")}>
              Hire Me
            </button>
            <button className="icon-btn show-mobile" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-menu">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}>{l.label}</button>
            ))}
            <button className="btn btn-primary" onClick={() => go("contact")}>Hire Me</button>
          </div>
        )}
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const typed = useTypingEffect(PROFILE.taglineRoles);
  return (
    <section id="top" className="hero">
      <div className="hero-blob blob-a" />
      <div className="hero-blob blob-b" />
      <div className="hero-grid" />

      <div className="hero-orbit" aria-hidden="true">
        {TECH_ORBIT.map((t, i) => (
          <span
            key={t}
            className="orbit-chip"
            style={{
              animationDelay: `${i * 0.4}s`,
              top: `${10 + ((i * 37) % 78)}%`,
              left: `${(i % 2 === 0 ? 4 : 90) + (i % 3) * 1.5}%`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="hero-content">
        <Reveal className="hero-kicker" delay={0}>
          <span className="dot-live" /> Open to Summer 2026 internships
        </Reveal>

        <Reveal as="h1" className="hero-title" delay={80}>
          Hi, I'm <span className="grad-text">Manoj</span>.<br />
          I engineer <span className="typing-wrap">{typed}<span className="caret" /></span>
        </Reveal>

        <Reveal as="p" className="hero-blurb" delay={160}>
          {PROFILE.blurb}
        </Reveal>

        <Reveal className="hero-actions" delay={240}>
          <a href="#" className="btn btn-primary">
            <Download size={16} /> Download Resume
          </a>
          <button className="btn btn-ghost" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View Projects
          </button>
          <button className="btn btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact Me
          </button>
        </Reveal>

        <Reveal className="hero-meta" delay={320}>
          <span><MapPin size={14} /> {PROFILE.location}</span>
          <span className="meta-sep" />
          <span><Mail size={14} /> {PROFILE.email}</span>
        </Reveal>

        <Reveal className="hero-socials" delay={380}>
          <a href={PROFILE.socials.github} aria-label="GitHub"><Github size={17} /></a>
          <a href={PROFILE.socials.linkedin} aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href={PROFILE.socials.leetcode} aria-label="LeetCode"><Terminal size={17} /></a>
          <a href={PROFILE.socials.hackerrank} aria-label="HackerRank"><Zap size={17} /></a>
        </Reveal>
      </div>

      <button
        className="scroll-cue"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to About"
      >
        <span className="scroll-cue-line" />
        Scroll
      </button>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS                                                              */
/* ------------------------------------------------------------------ */

function StatItem({ stat }) {
  const [ref, visible] = useReveal(0.4);
  const value = useCountUp(stat.value, visible);
  return (
    <div ref={ref} className="stat-item">
      <div className="stat-value">{value}{stat.suffix}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="stats-strip">
      <div className="container stats-grid">
        {STATS.map((s) => <StatItem key={s.label} stat={s} />)}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

function About() {
  const facts = [
    { icon: Heart, label: "Currently learning", value: "Distributed systems & Docker" },
    { icon: Target, label: "Career goal", value: "Backend-leaning full-stack role" },
    { icon: Compass, label: "Outside of code", value: "Chess, trail runs, sketchnoting" },
  ];
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal className="about-visual">
          <div className="about-photo-frame">
  <img
  src="/images/profile.jpeg"
  alt="Manoj"
  style={{
    width: "250px",
    height: "250px",
    borderRadius: "100%",
    objectFit: "cover",
    border: "3px solid #4F46E5",
    boxShadow: "0 0 20px rgba(79,70,229,0.4)"
  }}
/>
            <div className="about-badge">
              <BadgeCheck size={14} /> MCA · 2026
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="About" title="Considered engineering, not just working code" />
          <Reveal className="about-copy" delay={80}>
            <p>
              I'm an MCA student who got into software through curiosity about how the tools I used every
              day actually worked. That curiosity turned into a habit: I read the docs, rebuild the demo
              from scratch, and only then trust myself to use a library in something real.
            </p>
            <p>
              My mission is simple — ship things that are dependable before they're clever. My vision is to
              grow into an engineer people trust with ambiguous problems, not just well-specified tickets.
            </p>
          </Reveal>

          <Reveal className="fact-grid" delay={160}>
            {facts.map((f) => (
              <div key={f.label} className="fact-card">
                <f.icon size={18} />
                <div>
                  <div className="fact-label">{f.label}</div>
                  <div className="fact-value">{f.value}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                              */
/* ------------------------------------------------------------------ */

function SkillBar({ item, delay }) {
  const [ref, visible] = useReveal(0.3);
  return (
    <div ref={ref} className="skill-row">
      <div className="skill-row-top">
        <span>{item.name}</span>
        <span className="skill-pct">{item.level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: visible ? `${item.level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for"
          sub="Grounded in fundamentals, comfortable across the stack."
        />

        <div className="skill-groups">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.title} className="skill-card" delay={gi * 90}>
              <div className="skill-card-head">
                <group.icon size={18} />
                <h3>{group.title}</h3>
              </div>
              {group.items.map((item, i) => (
                <SkillBar key={item.name} item={item} delay={i * 90} />
              ))}
            </Reveal>
          ))}
        </div>

        <Reveal className="soft-skills" delay={120}>
          <span className="soft-skills-label"><Users size={16} /> Soft skills</span>
          <div className="soft-skills-tags">
            {SOFT_SKILLS.map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TIMELINE (education + experience)                                  */
/* ------------------------------------------------------------------ */

function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <SectionHeading eyebrow="Journey" title="Education & experience" sub="In reverse-chronological order." />

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} className="timeline-row" delay={i * 100}>
              <div className="timeline-marker">
                {item.type === "education" ? <GraduationCap size={16} /> : <Briefcase size={16} />}
              </div>
              <div className="timeline-card">
                <div className="timeline-card-top">
                  <h4>{item.title}</h4>
                  <span className="timeline-date"><Calendar size={12} /> {item.date}</span>
                </div>
                <div className="timeline-org">{item.org}</div>
                <p>{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                            */
/* ------------------------------------------------------------------ */

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="modal-hero">
          <span>{project.title.slice(0, 2).toUpperCase()}</span>
        </div>
        <div className="modal-body">
          <span className="tag tag-accent">{project.tag}</span>
          <h3>{project.title}</h3>
          <p>{project.desc}</p>

          <div className="modal-block">
            <h5>Tech stack</h5>
            <div className="chip-row">
              {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>

          <div className="modal-block">
            <h5>Features</h5>
            <ul className="feature-list">
              {project.features.map((f) => <li key={f}><CheckCircle2 size={14} /> {f}</li>)}
            </ul>
          </div>

          {!project.upcoming && (
            <div className="modal-grid-2">
              <div className="modal-block">
                <h5>Challenge</h5>
                <p className="muted">{project.challenge}</p>
              </div>
              <div className="modal-block">
                <h5>Solution</h5>
                <p className="muted">{project.solution}</p>
              </div>
            </div>
          )}

          <div className="modal-actions">
            <a href={project.github} className="btn btn-outline btn-sm"><Github size={15} /> Code</a>
            <a href={project.demo} className="btn btn-primary btn-sm"><ExternalLink size={15} /> Live Demo</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen, delay }) {
  return (
    <Reveal className={`project-card ${project.upcoming ? "project-upcoming" : ""}`} delay={delay}>
      <div className="project-thumb">
        <span>{project.title.slice(0, 2).toUpperCase()}</span>
        {project.upcoming && <span className="upcoming-pill">Upcoming</span>}
      </div>
      <div className="project-body">
        <div className="project-tags">
          {project.tags.slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <h4>{project.title}</h4>
        <p>{project.desc}</p>
        <div className="project-foot">
          <button className="link-btn" onClick={() => onOpen(project)}>Case Study →</button>
          <div className="project-icons">
            <a href={project.github} aria-label="GitHub"><Github size={16} /></a>
            <a href={project.demo} aria-label="Live demo"><ExternalLink size={16} /></a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  const filtered = PROJECTS.filter((p) => {
    const matchesFilter = filter === "All" || p.tags.includes(filter);
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <SectionHeading eyebrow="Projects" title="Featured work" sub="A mix of full-stack products and applied ML." />

        <Reveal className="project-controls" delay={60}>
          <div className="filter-row">
            {FILTERS.map((f) => (
              <button key={f} className={`filter-chip ${filter === f ? "filter-chip-active" : ""}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="search-box">
            <Search size={15} />
            <input placeholder="Search projects…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </Reveal>

        <div className="project-grid">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={setActive} delay={(i % 3) * 90} />
          ))}
          {filtered.length === 0 && <p className="muted">No projects match that search.</p>}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CERTIFICATIONS + ACHIEVEMENTS                                      */
/* ------------------------------------------------------------------ */

function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeading eyebrow="Recognition" title="Certifications & achievements" />

        <div className="two-col">
          <div>
            <h4 className="sub-heading">Certifications</h4>
            <div className="cert-list">
              {CERTIFICATIONS.map((c, i) => (
                <Reveal key={c.title} className="cert-card" delay={i * 80}>
                  <BadgeCheck size={20} />
                  <div className="cert-info">
                    <div className="cert-title">{c.title}</div>
                    <div className="cert-meta">{c.issuer} · {c.date}</div>
                  </div>
                  <button className="link-btn">View</button>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h4 className="sub-heading">Achievements</h4>
            <div className="achieve-list">
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={a.title} className="achieve-card" delay={i * 80}>
                  <div className="achieve-icon"><a.icon size={18} /></div>
                  <div>
                    <div className="cert-title">{a.title} <span className="achieve-year">{a.year}</span></div>
                    <div className="cert-meta">{a.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeading eyebrow="Feedback" title="What people say" />
        <Reveal className="testimonial-card" delay={80}>
          <Quote size={28} className="quote-icon" />
          <p className="testimonial-quote">{t.quote}</p>
          <div className="testimonial-foot">
            <div>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-title">{t.title}</div>
            </div>
            <div className="testimonial-nav">
              <button onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)} aria-label="Next">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`dot ${i === index ? "dot-active" : ""}`} onClick={() => setIndex(i)} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                             */
/* ------------------------------------------------------------------ */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3200);
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-grid">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's build something" sub="Open to internships, freelance, and full-time roles from mid-2026." />

          <Reveal className="contact-info" delay={100}>
            <a href={`mailto:${PROFILE.email}`}><Mail size={16} /> {PROFILE.email}</a>
            <span><MapPin size={16} /> {PROFILE.location}</span>
            <div className="contact-socials">
              <a href={PROFILE.socials.github}><Github size={16} /></a>
              <a href={PROFILE.socials.linkedin}><Linkedin size={16} /></a>
            </div>
          </Reveal>
        </div>

        <Reveal className="contact-form-wrap" delay={160}>
          {sent ? (
            <div className="sent-state">
              <CheckCircle2 size={36} />
              <h4>Message sent</h4>
              <p className="muted">Thanks — I'll reply within a day or two.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row-2">
                <div className="field">
                  <label>Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="field">
                <label>Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the project or role…" />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER + BACK TO TOP                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span className="brand-mark">MC</span>
          <p className="muted footer-tag">Built with React, care, and a lot of scroll-testing.</p>
        </div>
        <div className="footer-links">
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="footer-socials">
          <a href={PROFILE.socials.github}><Github size={16} /></a>
          <a href={PROFILE.socials.linkedin}><Linkedin size={16} /></a>
          <a href={`mailto:${PROFILE.email}`}><Mail size={16} /></a>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Manoj C. All rights reserved.</div>
    </footer>
  );
}

function BackToTop({ show }) {
  if (!show) return null;
  return (
    <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
      <ArrowUp size={18} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  CURSOR GLOW                                                        */
/* ------------------------------------------------------------------ */

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor-glow hide-mobile" />;
}

/* ------------------------------------------------------------------ */
/*  ROOT APP                                                            */
/* ------------------------------------------------------------------ */

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      setScrollProgress(scrolled || 0);
      setShowTop(h.scrollTop > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return (
    <div className="portfolio-root" data-theme={theme}>
      <style>{CSS}</style>
      <Loader done={!loading} />
      <CursorGlow />
      <Navbar theme={theme} toggleTheme={toggleTheme} scrollProgress={scrollProgress} />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop show={showTop} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Manrope:wght@500;600;700&display=swap');

.portfolio-root {
  --primary: #4F46E5;
  --secondary: #7C3AED;
  --accent: #06B6D4;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --font-head: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-btn: 'Manrope', sans-serif;
  font-family: var(--font-body);
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  transition: background .4s ease, color .4s ease;
}
.portfolio-root[data-theme="dark"] {
  --bg: #0F172A;
  --bg-elevated: #131f38;
  --text: #E7ECF7;
  --text-muted: #94A3B8;
  --border: rgba(148,163,184,0.16);
  --glass: rgba(255,255,255,0.05);
  --glass-strong: rgba(255,255,255,0.08);
  background: var(--bg);
  color: var(--text);
}
.portfolio-root[data-theme="light"] {
  --bg: #F8FAFC;
  --bg-elevated: #ffffff;
  --text: #0F172A;
  --text-muted: #52607a;
  --border: rgba(15,23,42,0.10);
  --glass: rgba(255,255,255,0.55);
  --glass-strong: rgba(255,255,255,0.75);
  background: var(--bg);
  color: var(--text);
}
.portfolio-root * { box-sizing: border-box; }
.portfolio-root h1, .portfolio-root h2, .portfolio-root h3, .portfolio-root h4, .portfolio-root h5 {
  font-family: var(--font-head); margin: 0; letter-spacing: -0.02em;
}
.portfolio-root p { margin: 0; line-height: 1.65; color: var(--text-muted); }
.portfolio-root a { color: inherit; text-decoration: none; }
.portfolio-root button { font-family: var(--font-btn); cursor: pointer; background: none; border: none; color: inherit; }
.container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }
.muted { color: var(--text-muted); }

/* reveal */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1); }
.reveal-in { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) { .reveal { transition: none; opacity: 1; transform: none; } }

/* section */
.section { padding: 110px 0; }
.section-alt { background: var(--bg-elevated); }
.section-heading { margin-bottom: 48px; max-width: 620px; }
.eyebrow { font-family: var(--font-btn); font-size: 12.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--primary); }
.section-title { font-size: clamp(28px, 3.4vw, 40px); margin-top: 10px; font-weight: 700; }
.section-sub { margin-top: 12px; font-size: 15.5px; }
.sub-heading { font-family: var(--font-head); font-size: 17px; font-weight: 600; margin-bottom: 18px; }

/* buttons */
.btn { font-family: var(--font-btn); font-weight: 600; font-size: 14.5px; padding: 13px 22px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; transition: transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease; border: 1px solid transparent; white-space: nowrap; }
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; box-shadow: 0 10px 30px -12px rgba(79,70,229,0.6); }
.btn-primary:hover { box-shadow: 0 14px 34px -10px rgba(79,70,229,0.75); }
.btn-outline { border-color: var(--border); background: var(--glass); backdrop-filter: blur(10px); }
.btn-outline:hover { border-color: var(--primary); }
.btn-ghost { background: var(--glass-strong); backdrop-filter: blur(10px); border: 1px solid var(--border); }
.btn-sm { padding: 9px 16px; font-size: 13px; }
.btn-full { width: 100%; justify-content: center; }
.icon-btn { width: 38px; height: 38px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; background: var(--glass); border: 1px solid var(--border); transition: border-color .2s ease, transform .2s ease; }
.icon-btn:hover { border-color: var(--primary); transform: translateY(-1px); }
.link-btn { color: var(--primary); font-weight: 600; font-size: 13.5px; }

/* scroll progress + navbar */
.scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--primary), var(--accent)); z-index: 200; transition: width .1s linear; }
.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 150; padding: 18px 0; transition: background .3s ease, padding .3s ease, border-color .3s ease; border-bottom: 1px solid transparent; }
.navbar-scrolled { padding: 10px 0; background: var(--glass-strong); backdrop-filter: blur(16px); border-color: var(--border); }
.navbar-inner { max-width: 1140px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 10px; }
.brand-mark { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-head); font-weight: 700; font-size: 13px; }
.brand-name { font-family: var(--font-head); font-weight: 600; font-size: 15px; }
.nav-links { display: flex; gap: 30px; }
.nav-links button { font-size: 14px; font-weight: 500; color: var(--text-muted); transition: color .2s ease; }
.nav-links button:hover { color: var(--text); }
.navbar-actions { display: flex; align-items: center; gap: 10px; }
.mobile-menu { display: flex; flex-direction: column; gap: 4px; padding: 16px 24px 20px; background: var(--bg-elevated); border-top: 1px solid var(--border); }
.mobile-menu button { text-align: left; padding: 10px 0; font-size: 15px; }
.show-mobile { display: none; }
@media (max-width: 860px) {
  .nav-links { display: none; }
  .hide-mobile { display: none; }
  .show-mobile { display: inline-flex; }
}

/* loader */
.loader { position: fixed; inset: 0; z-index: 500; display: flex; align-items: center; justify-content: center; background: #0F172A; transition: opacity .6s ease, visibility .6s ease; }
.loader-hide { opacity: 0; visibility: hidden; }
.loader-inner { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.loader-mark { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 30px; color: #fff; background: linear-gradient(135deg, #4F46E5, #06B6D4); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.loader-bar-track { width: 200px; height: 3px; border-radius: 3px; background: rgba(255,255,255,0.12); overflow: hidden; }
.loader-bar-fill { height: 100%; background: linear-gradient(90deg, #4F46E5, #06B6D4); transition: width .15s ease; }
.loader-pct { font-family: 'Manrope', sans-serif; font-size: 12px; color: rgba(255,255,255,0.6); }

/* hero */
.hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px 24px 80px; overflow: hidden; }
.hero-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .35; z-index: 0; animation: blobMove 16s ease-in-out infinite; }
.blob-a { width: 480px; height: 480px; background: var(--primary); top: -120px; left: -100px; }
.blob-b { width: 420px; height: 420px; background: var(--accent); bottom: -140px; right: -80px; animation-delay: -6s; }
@keyframes blobMove { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.08); } }
.hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent); opacity: .5; }
.hero-orbit { position: absolute; inset: 0; pointer-events: none; }
.orbit-chip { position: absolute; font-family: var(--font-btn); font-size: 12.5px; font-weight: 600; padding: 7px 12px; border-radius: 20px; background: var(--glass-strong); border: 1px solid var(--border); backdrop-filter: blur(10px); animation: floatChip 5s ease-in-out infinite; }
@keyframes floatChip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
.hero-content { position: relative; z-index: 2; max-width: 760px; text-align: center; display: flex; flex-direction: column; align-items: center; }
.hero-kicker { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; padding: 7px 14px; border-radius: 20px; background: var(--glass-strong); border: 1px solid var(--border); margin-bottom: 22px; }
.dot-live { width: 7px; height: 7px; border-radius: 50%; background: var(--success); box-shadow: 0 0 0 0 rgba(34,197,94,.6); animation: pulseDot 1.8s infinite; }
@keyframes pulseDot { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,.55); } 70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
.hero-title { font-size: clamp(32px, 5.6vw, 58px); font-weight: 800; line-height: 1.12; }
.grad-text { background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.typing-wrap { color: var(--primary); position: relative; }
.caret { display: inline-block; width: 3px; height: .9em; background: var(--accent); margin-left: 3px; vertical-align: middle; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.hero-blurb { margin-top: 22px; font-size: 17px; max-width: 560px; }
.hero-actions { margin-top: 34px; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.hero-meta { margin-top: 30px; display: flex; align-items: center; gap: 14px; font-size: 13.5px; color: var(--text-muted); }
.hero-meta span { display: inline-flex; align-items: center; gap: 6px; }
.meta-sep { width: 4px; height: 4px; border-radius: 50%; background: var(--text-muted); }
.hero-socials { margin-top: 20px; display: flex; gap: 14px; }
.hero-socials a { width: 38px; height: 38px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); background: var(--glass); transition: transform .2s ease, border-color .2s ease; }
.hero-socials a:hover { transform: translateY(-3px); border-color: var(--primary); }
.scroll-cue { position: absolute; bottom: 28px; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); }
.scroll-cue-line { width: 1px; height: 30px; background: linear-gradient(var(--text-muted), transparent); animation: cueMove 1.6s ease-in-out infinite; }
@keyframes cueMove { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

/* stats */
.stats-strip { padding: 56px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
.stat-value { font-family: var(--font-head); font-size: clamp(28px,4vw,40px); font-weight: 800; background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.stat-label { margin-top: 6px; font-size: 13.5px; color: var(--text-muted); }
@media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; } }

/* about */
.about-grid { display: grid; grid-template-columns: 320px 1fr; gap: 64px; align-items: start; }
.about-photo-frame { position: relative; aspect-ratio: 1; border-radius: 24px; background: linear-gradient(150deg, var(--glass-strong), var(--glass)); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
.about-photo-placeholder { font-family: var(--font-head); font-weight: 800; font-size: 64px; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.about-badge { position: absolute; bottom: -14px; left: 50%; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; padding: 8px 14px; border-radius: 20px; background: var(--bg-elevated); border: 1px solid var(--border); box-shadow: 0 10px 24px -10px rgba(0,0,0,.3); white-space: nowrap; }
.about-copy { display: flex; flex-direction: column; gap: 14px; font-size: 15.5px; }
.fact-grid { margin-top: 28px; display: grid; gap: 12px; }
.fact-card { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 14px; background: var(--glass); border: 1px solid var(--border); }
.fact-label { font-size: 12px; color: var(--text-muted); }
.fact-value { font-size: 14.5px; font-weight: 600; }
@media (max-width: 860px) { .about-grid { grid-template-columns: 1fr; } .about-photo-frame { max-width: 260px; margin: 0 auto; } }

/* skills */
.skill-groups { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.skill-card { padding: 24px; border-radius: 18px; background: var(--glass); border: 1px solid var(--border); backdrop-filter: blur(10px); transition: transform .3s ease, border-color .3s ease; }
.skill-card:hover { transform: translateY(-5px); border-color: var(--primary); }
.skill-card-head { display: flex; align-items: center; gap: 9px; margin-bottom: 18px; color: var(--primary); }
.skill-card-head h3 { font-size: 15px; font-weight: 600; color: var(--text); }
.skill-row { margin-bottom: 14px; }
.skill-row-top { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; }
.skill-pct { color: var(--text-muted); font-family: var(--font-btn); }
.skill-track { height: 6px; border-radius: 4px; background: var(--border); overflow: hidden; }
.skill-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--primary), var(--accent)); transition: width 1.1s cubic-bezier(.2,.7,.2,1); }
.soft-skills { margin-top: 34px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.soft-skills-label { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; }
.soft-skills-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.tag { font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 20px; background: var(--glass-strong); border: 1px solid var(--border); }
.tag-accent { background: rgba(79,70,229,0.12); color: var(--primary); border-color: rgba(79,70,229,.3); }
@media (max-width: 960px) { .skill-groups { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .skill-groups { grid-template-columns: 1fr; } }

/* timeline */
.timeline { position: relative; display: flex; flex-direction: column; gap: 26px; padding-left: 26px; border-left: 2px solid var(--border); }
.timeline-row { position: relative; display: flex; gap: 18px; }
.timeline-marker { position: absolute; left: -37px; top: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--bg); border: 2px solid var(--primary); color: var(--primary); display: flex; align-items: center; justify-content: center; }
.timeline-card { flex: 1; padding: 18px 20px; border-radius: 16px; background: var(--glass); border: 1px solid var(--border); }
.timeline-card-top { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; align-items: baseline; }
.timeline-card-top h4 { font-size: 15.5px; font-weight: 600; }
.timeline-date { font-size: 12px; color: var(--text-muted); display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.timeline-org { font-size: 13.5px; color: var(--primary); font-weight: 600; margin: 4px 0 8px; }
.timeline-card p { font-size: 14px; }

/* projects */
.project-controls { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 32px; }
.filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-chip { font-size: 13px; font-weight: 600; padding: 8px 15px; border-radius: 20px; border: 1px solid var(--border); background: var(--glass); transition: all .2s ease; }
.filter-chip-active { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; border-color: transparent; }
.search-box { display: flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 20px; border: 1px solid var(--border); background: var(--glass); }
.search-box input { background: none; border: none; outline: none; color: var(--text); font-size: 13.5px; width: 160px; }
.project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.project-card { border-radius: 18px; overflow: hidden; background: var(--bg-elevated); border: 1px solid var(--border); transition: transform .35s ease, box-shadow .35s ease; }
.project-card:hover { transform: translateY(-6px); box-shadow: 0 22px 40px -20px rgba(79,70,229,0.35); }
.project-upcoming { opacity: .8; }
.project-thumb { position: relative; height: 140px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(79,70,229,.35), rgba(6,182,212,.35)); }
.project-thumb span { font-family: var(--font-head); font-weight: 800; font-size: 30px; color: #fff; }
.upcoming-pill { position: absolute; top: 10px; right: 10px; font-size: 10.5px; font-weight: 700; padding: 4px 9px; border-radius: 12px; background: rgba(0,0,0,.35); color: #fff; }
.project-body { padding: 20px; }
.project-tags { display: flex; gap: 6px; margin-bottom: 10px; }
.project-body h4 { font-size: 16.5px; font-weight: 600; margin-bottom: 8px; }
.project-body p { font-size: 13.5px; margin-bottom: 16px; }
.project-foot { display: flex; justify-content: space-between; align-items: center; }
.project-icons { display: flex; gap: 12px; color: var(--text-muted); }
.project-icons a:hover { color: var(--primary); }
@media (max-width: 960px) { .project-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .project-grid { grid-template-columns: 1fr; } }

/* modal */
.modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(4,8,20,0.65); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn .25s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal-card { position: relative; max-width: 560px; width: 100%; max-height: 86vh; overflow-y: auto; border-radius: 20px; background: var(--bg-elevated); border: 1px solid var(--border); animation: modalIn .3s cubic-bezier(.2,.7,.2,1); }
@keyframes modalIn { from { opacity: 0; transform: translateY(20px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.modal-close { position: absolute; top: 14px; right: 14px; z-index: 2; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,.35); color: #fff; display: flex; align-items: center; justify-content: center; }
.modal-hero { height: 150px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--primary), var(--accent)); }
.modal-hero span { font-family: var(--font-head); font-weight: 800; font-size: 36px; color: #fff; }
.modal-body { padding: 26px; display: flex; flex-direction: column; gap: 16px; }
.modal-body h3 { font-size: 20px; }
.modal-block h5 { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--text-muted); margin-bottom: 8px; }
.modal-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.chip-row { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { font-size: 12px; padding: 5px 10px; border-radius: 8px; background: var(--glass-strong); border: 1px solid var(--border); }
.feature-list { display: flex; flex-direction: column; gap: 8px; font-size: 13.5px; }
.feature-list li { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }
.feature-list svg { color: var(--success); flex-shrink: 0; }
.modal-actions { display: flex; gap: 10px; margin-top: 6px; }
@media (max-width: 520px) { .modal-grid-2 { grid-template-columns: 1fr; } }

/* achievements */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.cert-list, .achieve-list { display: flex; flex-direction: column; gap: 12px; }
.cert-card, .achieve-card { display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 14px; background: var(--glass); border: 1px solid var(--border); }
.cert-card svg { color: var(--primary); flex-shrink: 0; }
.cert-info { flex: 1; }
.cert-title { font-size: 14px; font-weight: 600; }
.cert-meta { font-size: 12.5px; color: var(--text-muted); margin-top: 2px; }
.achieve-icon { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.achieve-year { font-size: 11px; color: var(--text-muted); font-weight: 500; margin-left: 6px; }
@media (max-width: 780px) { .two-col { grid-template-columns: 1fr; } }

/* testimonials */
.testimonial-card { max-width: 680px; margin: 0 auto; text-align: center; padding: 40px; border-radius: 20px; background: var(--glass); border: 1px solid var(--border); }
.quote-icon { color: var(--primary); opacity: .5; margin-bottom: 14px; }
.testimonial-quote { font-size: 18px; font-family: var(--font-head); font-weight: 500; color: var(--text); line-height: 1.55; }
.testimonial-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 26px; }
.testimonial-name { font-weight: 600; font-size: 14.5px; text-align: left; }
.testimonial-title { font-size: 12.5px; color: var(--text-muted); text-align: left; }
.testimonial-nav { display: flex; gap: 8px; }
.testimonial-nav button { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
.testimonial-dots { display: flex; gap: 7px; justify-content: center; margin-top: 22px; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); transition: background .2s ease, transform .2s ease; }
.dot-active { background: var(--primary); transform: scale(1.3); }

/* contact */
.contact-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 56px; }
.contact-info { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
.contact-info a, .contact-info span { display: inline-flex; align-items: center; gap: 10px; font-size: 14.5px; }
.contact-info a:hover { color: var(--primary); }
.contact-socials { display: flex; gap: 10px; margin-top: 6px; }
.contact-socials a { width: 36px; height: 36px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); background: var(--glass); }
.contact-form-wrap { padding: 28px; border-radius: 20px; background: var(--glass); border: 1px solid var(--border); }
.contact-form { display: flex; flex-direction: column; gap: 16px; }
.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 12.5px; font-weight: 600; color: var(--text-muted); }
.field input, .field textarea { font-family: var(--font-body); padding: 11px 14px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg-elevated); color: var(--text); font-size: 14px; outline: none; transition: border-color .2s ease; resize: vertical; }
.field input:focus, .field textarea:focus { border-color: var(--primary); }
.field-error { font-size: 11.5px; color: var(--danger); }
.sent-state { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; padding: 40px 0; color: var(--success); }
.sent-state h4 { color: var(--text); font-size: 18px; }
@media (max-width: 780px) { .contact-grid { grid-template-columns: 1fr; } .form-row-2 { grid-template-columns: 1fr; } }

/* footer */
.footer { border-top: 1px solid var(--border); padding: 40px 0 0; }
.footer-inner { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; flex-wrap: wrap; padding-bottom: 28px; }
.footer-tag { font-size: 13px; margin-top: 10px; max-width: 220px; }
.footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
.footer-links button { font-size: 13.5px; color: var(--text-muted); }
.footer-links button:hover { color: var(--text); }
.footer-socials { display: flex; gap: 10px; }
.footer-socials a { width: 34px; height: 34px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
.footer-bottom { text-align: center; padding: 18px 0; font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border); }

/* back to top */
.back-to-top { position: fixed; bottom: 26px; right: 26px; width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 26px -10px rgba(79,70,229,.7); z-index: 120; animation: fadeIn .3s ease; }

/* cursor glow */
.cursor-glow { position: fixed; top: 0; left: 0; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(79,70,229,0.12), transparent 70%); pointer-events: none; z-index: 5; transition: transform .12s linear; }
@media (max-width: 860px) { .hide-mobile.cursor-glow { display: none; } }
`;
