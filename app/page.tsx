"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  School,
  Award,
  Briefcase,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Rocket,
  Brain,
  Gauge,
} from "lucide-react";

// =============================================
// AYUSH MISRA — SINGLE-FILE REACT PORTFOLIO (FIXED)
// - Fixes unterminated JSX (<p> tag) that caused SyntaxError.
// - Restores complete Skills, Education, Contact sections.
// - Removes Resume button per user request.
// - Smooth-scrolling nav to avoid any browser/CSP blocking warnings.
// - Adds lightweight runtime "tests" via console.assert for section anchors.
// =============================================

const LINKS = {
  email: "mailto:amisra2@stevens.edu",
  github: "https://github.com/ayushmisra05",
  linkedin: "http://linkedin.com/in/ayush-misra-a0259b283",
};

const TAG = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur border-white/15 bg-white/5 text-white/80">
    {children}
  </span>
);

const Section = ({ id, title, subtitle, icon: Icon, children }) => (
  <section id={id} className="scroll-mt-24 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4">
      <div className="mb-10 flex items-center gap-3">
        {Icon ? (
          <div className="rounded-2xl bg-white/5 p-2.5 border border-white/10"><Icon className="h-5 w-5" /></div>
        ) : null}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-white/60 mt-1">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  </section>
);

const Badge = ({ children }) => (
  <span className="rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 text-xs">
    {children}
  </span>
);

const Separator = () => (
  <div className="mx-auto max-w-6xl px-4">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

const useCopy = (text) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.error(e);
    }
  };
  return { copied, copy };
};

// ---------- DATA ----------
const EDUCATION = {
  school: "Stevens Institute of Technology",
  degree: "B.S. in Computer Science",
  location: "Hoboken, NJ",
  grad: "Expected May 2027",
  gpa: "GPA: 3.92/4",
  awards: [
    "Edwin A. Stevens Award",
    "Presidential Award",
    "Dean’s List",
  ],
  coursework: [
    "Software Development",
    "Data Structures",
    "Algorithms",
    "Backend Development",
    "Computer Architecture & Organization",
    "Systems Programming",
    "Principles of Programming Languages",
    "Research & Entrepreneurship in Computing",
    "Discrete Structures",
  ],
};

const SKILLS = {
  Languages: [
    "Python",
    "Java",
    "JavaScript/TypeScript",
    "C++",
    "C",
    "HTML/CSS",
    "Assembly",
    "R",
    "Scheme/Racket",
    "OCaml",
  ],
  Frameworks: [
    "Spring Boot",
    "Django",
    "Flask",
    "FastAPI",
    "React",
    "Next.js",
    "Docker",
    "Postman",
    "Jenkins",
    "Git/GitHub Actions",
    "Kafka",
    "IBM MQ",
    "Jira",
  ],
  Cloud_Databases: [
    "AWS",
    "Azure",
    "IBM Db2",
    "PostgreSQL",
    "MongoDB",
    "DynamoDB",
  ],
};

const EXPERIENCES = [
  {
    company: "Principal Financial Group",
    title: "Software Engineer Intern",
    date: "May 2025 – Aug 2025",
    location: "Charlotte, NC",
    tags: ["Java", "Spring Boot", "AWS", "IBM MQ", "Jenkins", "Db2", "Microservices"],
    bullets: [
      "Engineered and deployed event-driven microservices for enterprise retirement platforms (ManagedAccounts, TMRSA, IQDIA) used by millions of customers, leveraging AWS for scale and reliability.",
      "Integrated IBM MQ with AWS to publish subscription-based events to the ManagedAccounts CMP system, reducing messaging latency by ~40% and enabling robust CI/CD via Jenkins.",
      "Automated unenrollment of participants with zero balance and terminated status, saving ~100+ engineering hours annually; extended support for 20+ ManagedAccounts processes (e.g., investment rebalancing).",
    ],
  },
  {
    company: "Stevens Institute of Technology (IBM | Park Avenue Finance | Agam Capital)",
    title: "Research Software Developer (Machine Learning)",
    date: "Mar 2024 – Aug 2025",
    location: "Hoboken, NJ",
    tags: ["Python", "FastAPI", "MongoDB", "Qdrant", "SBERT", "React", "NLP"],
    bullets: [
      "Architected and deployed an AI-powered compliance research platform with FastAPI, MongoDB, Qdrant, and React—supporting auth, search history, feedback, and dynamic LLM selection.",
      "Built semantic search using SBERT embeddings in Qdrant, improving result relevance by ~20% for financial regulatory retrieval.",
      "Developed NLP pipelines and XML parsers to extract structured insights from complex regulations and tables, reducing data extraction time by ~35%.",
    ],
  },
];

const PROJECTS = [
  {
    name: "BRIEF — Automated OOO Catch-Up",
    blurb:
      "AI-powered assistant that centralizes Outlook, Teams, and JIRA updates for returning employees. Generates priority-ranked summaries, proposes meetings from Microsoft Graph availability, and surfaces must-read threads. Top-5 Finalist among 30 teams with plans for enterprise deployment.",
    tags: ["Python", "React", "TypeScript", "Next.js", "AWS Lambda", "DynamoDB", "Microsoft Graph", "JIRA", "LLMOps"],
    links: {},
  },
  {
    name: "ZillowCopy — House Price Predictor",
    blurb:
      "TensorFlow + scikit-learn pipeline that predicts NY-region house prices with ~95% accuracy; scraped & processed 10k+ properties; features include sqft, geo, locality & bed/bath counts.",
    tags: ["Python", "TensorFlow", "scikit-learn", "NumPy", "pandas", "ETL"],
    links: {},
  },
  {
    name: "Restaurant Lemon API",
    blurb:
      "Two full-stack APIs in Django REST Framework for menu and reservation workflows; JWT auth, SQLite persistence, and responsive HTML/CSS frontend.",
    tags: ["Django REST", "Python", "JWT", "SQLite", "Full-stack"],
    links: {},
  },
];

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// ---------- NAV ----------
function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <a href="#about" onClick={(e)=>goTo(e,"about")} className="flex items-center gap-2 font-semibold tracking-tight">
            <Code2 className="h-5 w-5" />
            <span>Ayush Misra</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e)=>goTo(e,n.id)} className="text-white/80 hover:text-white transition-colors">
                {n.label}
              </a>
            ))}
          </div>
          <button onClick={() => setOpen((s) => !s)} className="md:hidden rounded-lg border border-white/10 p-2" aria-expanded={open} aria-controls="mobile-nav">
            <span className="sr-only">Toggle Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {open && (
          <div id="mobile-nav" className="md:hidden border-t border-white/10 py-3">
            <div className="flex flex-col gap-3">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={(e)=>goTo(e,n.id)} className="text-white/80 hover:text-white transition-colors">
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- HERO ----------
function Hero() {
  const { copied, copy } = useCopy("amisra2@stevens.edu");
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_40%_at_50%_0%,black,transparent)]">
        <div className="absolute left-1/2 top-10 h-72 w-[65rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/20 via-sky-500/10 to-indigo-500/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-start gap-6">
          <Badge>Open to 2026 SWE Internships</Badge>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
            Building scalable systems & useful software engineered products.
          </h1>
          <p className="max-w-2xl text-white/70">
            Hey, I'm Ayush a Computer Science student at Stevens. I have a large passion for Software Engineering and AI Automation.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy Email"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ---------- EXPERIENCE CARD ----------
function ExperienceCard({ exp }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 hover:border-white/20">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-xl bg-white/5 p-2.5 border border-white/10"><Briefcase className="h-4 w-4" /></div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight">{exp.title} · <span className="text-white/80">{exp.company}</span></h3>
          <p className="text-xs text-white/60">{exp.date} · {exp.location}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {exp.tags?.map((t) => (
          <TAG key={t}>{t}</TAG>
        ))}
      </div>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
        {exp.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </motion.div>
  );
}

// ---------- PROJECT CARD ----------
function ProjectCard({ p }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
          <p className="mt-2 text-sm text-white/75">{p.blurb}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <TAG key={t}>{t}</TAG>
        ))}
      </div>
      {p.links && (p.links.demo || p.links.repo) ? (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {p.links.demo && (
            <a href={p.links.demo} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          {p.links.repo && (
            <a href={p.links.repo} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5">
              <Github className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      ) : null}
    </motion.div>
  );
}

// ---------- SKILLS ----------
function Skills() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="rounded-2xl border border-white/10 p-6">
        <h3 className="text-base font-semibold">Languages</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {SKILLS.Languages.map((s) => (
            <TAG key={s}>{s}</TAG>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="rounded-2xl border border-white/10 p-6">
        <h3 className="text-base font-semibold">Frameworks & Tools</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {SKILLS.Frameworks.map((s) => (
            <TAG key={s}>{s}</TAG>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-2xl border border-white/10 p-6">
        <h3 className="text-base font-semibold">Cloud & Databases</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {SKILLS.Cloud_Databases.map((s) => (
            <TAG key={s}>{s}</TAG>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ---------- EDUCATION ----------
function Education() {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/5 p-2.5 border border-white/10"><School className="h-5 w-5" /></div>
          <div>
            <h3 className="text-lg font-semibold leading-tight">{EDUCATION.school}</h3>
            <p className="text-sm text-white/70">{EDUCATION.degree} · {EDUCATION.gpa}</p>
            <p className="text-xs text-white/60">{EDUCATION.location} · {EDUCATION.grad}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {EDUCATION.awards.map((a) => (
            <span key={a} className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1 text-xs"><Award className="h-3.5 w-3.5" />{a}</span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h4 className="text-sm font-semibold tracking-wide text-white/80">Related Coursework</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {EDUCATION.coursework.map((c) => (
            <TAG key={c}>{c}</TAG>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- CONTACT ----------
function Contact() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold">Let’s connect</h3>
        <p className="mt-2 text-sm text-white/75">Whether you’re hiring for SWE internships or want to chat about full‑stack, systems, or ML, I’d love to talk.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5"><Mail className="h-4 w-4" /> Email</a>
          <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5"><Linkedin className="h-4 w-4" /> LinkedIn</a>
          <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/5"><Github className="h-4 w-4" /> GitHub</a>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold">Quick note</h3>
        <form action={LINKS.email} method="GET" className="mt-3 space-y-3">
          <input name="subject" placeholder="Subject" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <textarea name="body" placeholder="Your message" rows={5} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-900 px-3 py-2 text-sm font-medium hover:bg-white/90"><Mail className="h-4 w-4" /> Send</button>
        </form>
      </div>
    </div>
  );
}

// ---------- PAGE ----------
export default function Portfolio() {
  const [year] = useState(() => new Date().getFullYear());

  // Lightweight runtime "tests" to ensure nav anchors are present
  useEffect(() => {
    NAV.forEach(({ id }) => {
      const exists = !!document.getElementById(id);
      console.assert(exists, `Section with id="#${id}" should exist.`);
    });
    console.assert(SKILLS.Languages.length > 0, "Skills.Languages should not be empty");
    console.assert(EDUCATION.school?.length > 0, "Education.school should be set");
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-400 selection:text-zinc-950">
      <Nav />
      <main>
        <Hero />
        <Separator />

        <Section id="about" title="About" subtitle="Who I am & what I do" icon={Brain}>
          <div className="grid gap-6 md:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="md:col-span-3 rounded-2xl border border-white/10 p-6">
              <p className="text-white/80">
                I enjoy scaling systems and products and automating tasks through machine learning that solve real world problems, Recently I...
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80 text-sm">
                <li>Shipped event-driven microservices at <strong>Principal Financial</strong> using Java, Spring Boot, AWS, and IBM MQ.</li>
                <li>Built an AI compliance platform with FastAPI, MongoDB, Qdrant, and SBERT semantic retrieval.</li>
                <li>Designed full-stack apps with React/Next.js and serverless (AWS Lambda + DynamoDB).</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <TAG>Full-Stack</TAG>
                <TAG>Backend</TAG>
                <TAG>ML/NLP</TAG>
                <TAG>AWS Cloud</TAG>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="md:col-span-2 rounded-2xl border border-white/10 p-6">
              <h4 className="text-sm font-semibold tracking-wide text-white/80">Fast facts</h4>
              <div className="mt-3 space-y-2 text-sm text-white/75">
                <div className="flex items-center gap-2"><School className="h-4 w-4" /> Stevens Institute of Technology</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Hoboken, NJ</div>
                <div className="flex items-center gap-2"><Award className="h-4 w-4" /> Edwin A. Stevens & Presidential Awards</div>
                <div className="flex items-center gap-2"><Gauge className="h-4 w-4" /> GPA 3.92/4</div>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section id="experience" title="Experience" subtitle="What I’ve shipped" icon={Briefcase}>
          <div className="grid gap-6 md:grid-cols-2">
            {EXPERIENCES.map((e) => (
              <ExperienceCard key={e.company + e.date} exp={e} />
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects" subtitle="Selected work" icon={Rocket}>
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" subtitle="Tools I use to get things done" icon={Code2}>
          <Skills />
        </Section>

        <Section id="education" title="Education" subtitle="Foundations & accolades" icon={School}>
          <Education />
        </Section>

        <Section id="contact" title="Contact" subtitle="Say hello" icon={Mail}>
          <Contact />
        </Section>
      </main>
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div>© {year} Ayush Misra. Built with React & Tailwind.</div>
          <div className="flex items-center gap-3">
            <a href={LINKS.github} className="hover:text-white"><Github className="h-4 w-4" /></a>
            <a href={LINKS.linkedin} className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
            <a href={LINKS.email} className="hover:text-white"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
