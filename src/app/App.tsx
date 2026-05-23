import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Menu,
  X,
  Trophy,
  Star,
  Code2,
  Users,
  ExternalLink,
  Zap,
  BookOpen,
  Globe,
  Award,
  Sparkles,
} from "lucide-react";

// ─── animation variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  "About",
  "Education",
  "Projects",
  "Community",
  "Skills",
  "Contact",
];

const HACKATHONS = [
  {
    title: "EcoVibe",
    event: "Xynova Ideathon",
    position: "1st Position",
    badge: "gold" as const,
    description:
      "Developed an eco-friendly app concept for upcycled products. Collaborated on UI planning and ideation.",
    tags: ["App Concept", "UI Planning", "Ideation"],
    links: [
      { 
        label: "Figma Prototype", 
        url: "https://www.figma.com/proto/Q71sHdZutfsftAmSKRmfpI/EcoVibe?node-id=335-506&starting-point-node-id=335%3A506&t=iCk184p8s5khNWAk-1&scaling=scale-down&content-scaling=fixed", 
        type: "figma" 
      },
    ],
  },
  {
    title: "XpenseTrack",
    event: "Payload Hackathon",
    position: "1st Runner-Up",
    badge: "silver" as const,
    description:
      "Designed UI/UX for a student expense tracking application focused on creating a simple budgeting experience.",
    tags: ["UI/UX", "FinTech", "Student App"],
    links: [
      { 
        label: "Figma Prototype", 
        url: "https://www.figma.com/proto/tD44GXuZd0Svmcwk4ufzHX/XpenseTrack?node-id=373-853&starting-point-node-id=373%3A853&scaling=scale-down&content-scaling=fixed&t=zLrGiGsqv9wfzKtI-1", 
        type: "figma" 
      },
    ],
  },
  {
    title: "SilverEase",
    event: "WIEgnite 3.0",
    position: "Finalist",
    badge: "bronze" as const,
    description:
      "Developed an accessibility-focused app idea for senior citizens. Collaborated on feature ideation and solution planning.",
    tags: ["Accessibility", "App Design", "Social Impact"],
    links: [
      { 
        label: "Figma Prototype", 
        url: "https://www.figma.com/proto/L9FFjvmCxGH1m9hTvyuvI2/SilverEase?node-id=1-1945&starting-point-node-id=1%3A1945&scaling=scale-down&content-scaling=fixed&t=RiMZ6BHB6ivd23Vf-1", 
        type: "figma" 
      },
    ],
  },
  {
    title: "XpenseTrack",
    event: "Devcation Delhi 2026",
    position: "Pre-finalist",
    badge: "mention" as const,
    description:
      "Developed a functional prototype of a student expense tracking application. Worked on frontend development and app workflow.",
    tags: ["Frontend", "Prototype", "FinTech"],
    links: [
      { 
        label: "GitHub Repo", 
        url: "https://github.com/shriyamohann14/XpenseTrack", 
        type: "github" 
      },
    ],
  },
  {
    title: "XpenseOps",
    event: "Android Expense Management App",
    badge: "mention" as const,
    description:
      "Built an Android expense management app for organizational budgeting, tracking, and workflow management.",
    tags: ["Android", "Expense Tracking", "Budgeting"],
    links: [
      { 
        label: "GitHub Repo", 
        url: "https://github.com/shriyamohann14/XpenseOps", 
        type: "github" 
      },
    ],
  },
];

const COMMUNITY = [
  {
    role: "Contributor",
    org: "GirlScript Summer of Code (GSSoC)",
    desc: "Exploring open-source collaboration and Git workflows.",
    icon: Code2,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    role: "Mentee",
    org: "GDG New Delhi",
    desc: "Completed mentorship program through workshops and technical learning sessions.",
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    role: "Member",
    org: "Rotaract Club, IGDTUW",
    desc: "Managed social media content and digital engagement activities.",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    role: "KARM Aawaz Fellow",
    org: "Leadership Fellowship",
    desc: "Participating in leadership and personal growth fellowship sessions.",
    icon: Award,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech (Computer Science)",
    institution:
      "Indira Gandhi Delhi Technical University for Women (IGDTUW), Delhi",
    year: "2025 – 2029",
    metric: "8.33",
    unit: "CGPA",
    status: "ongoing",
  },
  {
    degree: "Class XII — CBSE",
    institution: "Higher Secondary Education",
    year: "2024",
    metric: "95.6%",
    unit: "Percentage",
    status: "completed",
  },
  {
    degree: "JEE Main",
    institution: "Joint Entrance Examination",
    year: "2025",
    metric: "97.66",
    unit: "Percentile",
    status: "completed",
  },
];

const SKILLS: Record<
  string,
  { items: string[]; color: string }
> = {
  "Programming Languages": {
    items: ["C", "Python", "R", "Kotlin"],
    color:
      "bg-violet-500/10 border-violet-500/25 text-violet-300 hover:bg-violet-500/20",
  },
  "Web & App Development": {
    items: ["HTML", "CSS", "JavaScript"],
    color:
      "bg-blue-500/10 border-blue-500/25 text-blue-300 hover:bg-blue-500/20",
  },
  "Data & Analysis": {
    items: [
      "Data Structures",
      "Probability & Statistics",
      "MS Excel",
      "Google Sheets",
    ],
    color:
      "bg-emerald-500/10 border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/20",
  },
  "Tools & Platforms": {
    items: [
      "Android Studio",
      "VS Code",
      "Git & GitHub",
      "Google Colab",
      "RStudio",
      "Figma",
      "Canva",
    ],
    color:
      "bg-primary/10 border-primary/25 text-primary hover:bg-primary/20",
  },
  "Core Competencies": {
    items: [
      "Problem Solving",
      "UI/UX Design",
      "Teamwork",
      "Leadership",
    ],
    color:
      "bg-pink-500/10 border-pink-500/25 text-pink-300 hover:bg-pink-500/20",
  },
};

const BADGE_STYLE: Record<string, string> = {
  gold: "bg-amber-500/15 border-amber-500/30 text-amber-400",
  silver: "bg-slate-400/15 border-slate-400/30 text-slate-300",
  bronze:
    "bg-orange-500/15 border-orange-500/30 text-orange-400",
  mention: "bg-primary/15 border-primary/30 text-primary",
};

// ─── shared components ────────────────────────────────────────────────────────

function SectionLabel({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-16">
      <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 mb-3 block">
        {eyebrow}
      </span>
      <h2
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {title}
      </h2>
      <div className="h-px w-20 bg-gradient-to-r from-primary via-secondary to-transparent" />
    </div>
  );
}

function GlassCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border bg-card/40 backdrop-blur-xl shadow-xl ${className}`}
      style={{
        borderColor: "rgba(139, 92, 246, 0.2)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.1) inset",
      }}
    >
      {children}
    </div>
  );
}

// ─── navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl border-b shadow-lg shadow-black/40"
            : "bg-transparent"
        }`}
        style={{
          borderBottomColor: scrolled
            ? "rgba(139, 92, 246, 0.15)"
            : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-bold text-xl tracking-tight text-foreground relative group"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              P
            </span>
            riyanshi
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              .
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </button>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative group font-medium"
              >
                {link}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group"
            style={{
              background:
                "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
              color: "#F8FAFC",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Zap size={14} className="relative z-10" />
            <span className="relative z-10">Hire Me</span>
          </button>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* ── background ── */}
      <div className="absolute inset-0">
        {/* gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(139, 92, 246, 0.15), transparent), radial-gradient(ellipse 60% 50% at 50% 80%, rgba(59, 130, 246, 0.1), transparent)",
          }}
        />
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
          style={{
            background:
              "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          }}
        />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
      </div>

      {/* ── floating code card ── */}
      <motion.div
        className="absolute top-28 right-6 md:right-20 lg:right-32 hidden sm:block"
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          delay: 1.0,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ animation: "floatA 7s ease-in-out infinite" }}
      >
        <GlassCard className="p-5 max-w-[220px]">
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <span className="ml-auto text-[10px] text-muted-foreground/60 font-medium">
              app.jsx
            </span>
          </div>
          <div className="text-xs font-mono space-y-1 leading-relaxed">
            <div>
              <span className="text-primary">const</span>{" "}
              <span className="text-secondary">me</span>{" "}
              <span className="text-muted-foreground">
                = {"{"}
              </span>
            </div>
            <div className="pl-3 text-muted-foreground">
              role:{" "}
              <span className="text-emerald-400">
                "developer"
              </span>
              ,
            </div>
            <div className="pl-3 text-muted-foreground">
              vibes:{" "}
              <span className="text-emerald-400">
                "learning"
              </span>
              ,
            </div>
            <div className="pl-3 text-muted-foreground">
              cgpa: <span className="text-amber-400">8.33</span>
            </div>
            <div className="text-muted-foreground">{"}"}</div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── floating stats card ── */}
      <motion.div
        className="absolute bottom-36 left-4 md:left-20 lg:left-32 hidden sm:block"
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          animation: "floatB 8s ease-in-out infinite 1.5s",
        }}
      >
        <GlassCard className="p-5 min-w-[200px]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                }}
              >
                <Trophy size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground leading-none mb-1 font-medium">
                  Hackathons
                </div>
                <div className="text-base font-bold text-foreground">
                  5+
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
              >
                <Code2 size={16} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground leading-none mb-1 font-medium">
                  Open Source
                </div>
                <div className="text-sm font-bold text-foreground">
                  GSSoC
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── main content ── */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold mb-10"
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            borderColor: "rgba(139, 92, 246, 0.3)",
            color: "#8B5CF6",
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
          }}
        >
          <Zap size={14} />
          Available for opportunities & collaborations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-5xl md:text-7xl lg:text-7.5xl font-extrabold mb-8 leading-[1.1] tracking-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Hi, I&apos;m{" "}
          <span
            className="bg-clip-text text-transparent relative"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
              textShadow: "0 0 80px rgba(139, 92, 246, 0.5)",
            }}
          >
            Priyanshi Jain
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg md:text-xl font-medium mb-6 max-w-3xl mx-auto leading-relaxed"
          style={{ color: "#CBD5E1" }}
        >
          First-year B.Tech student at IGDTUW exploring{" "}
          <span className="text-primary font-semibold">
            software development
          </span>
          ,{" "}
          <span className="text-secondary font-semibold">
            UI/UX
          </span>
          , and{" "}
          <span className="text-secondary font-semibold">
            open source
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <a
            href="https://github.com/jpriyanshi121-cyber/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden group"
            style={{
              background:
                "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
              color: "#F8FAFC",
              boxShadow: "0 8px 30px rgba(139, 92, 246, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Github size={18} className="relative z-10" />
            <span className="relative z-10">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/priyanshi-jain-003550367/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderWidth: "1.5px",
              borderStyle: "solid",
              borderColor: "rgba(139, 92, 246, 0.3)",
              color: "#F8FAFC",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            href="/Resume.pdf"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderWidth: "1.5px",
              borderStyle: "solid",
              borderColor: "rgba(59, 130, 246, 0.3)",
              color: "#F8FAFC",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            Resume
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>

      {/* ── scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            size={16}
            className="text-muted-foreground/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── about ────────────────────────────────────────────────────────────────────

function About() {
  const stats = [
    {
      icon: Trophy,
      label: "Hackathon Podiums",
      value: "2 Wins",
      gradient:
        "linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05))",
      color: "text-amber-400",
      shadow: "0 0 25px rgba(251, 191, 36, 0.3)",
    },
    {
      icon: Code2,
      label: "Open Source",
      value: "GSSoC",
      gradient:
        "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))",
      color: "text-emerald-400",
      shadow: "0 0 25px rgba(16, 185, 129, 0.3)",
    },
    {
      icon: Users,
      label: "Communities",
      value: "3+ Active",
      gradient:
        "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))",
      color: "text-primary",
      shadow: "0 0 25px rgba(139, 92, 246, 0.3)",
    },
    {
      icon: BookOpen,
      label: "Current CGPA",
      value: "8.33 / 10",
      gradient:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))",
      color: "text-secondary",
      shadow: "0 0 25px rgba(59, 130, 246, 0.3)",
    },
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel eyebrow="Who I Am" title="About Me" />
          </motion.div>

          <div className="grid md:grid-cols-5 gap-16 items-start">
            <motion.div
              variants={fadeUp}
              className="md:col-span-3 space-y-6 text-muted-foreground leading-relaxed text-base"
            >
              <p>
                I&apos;m a first-year B.Tech student at{" "}
                <span className="text-foreground font-semibold">
                  Indira Gandhi Delhi Technical University for
                  Women (IGDTUW)
                </span>
                , Delhi — driven by a deep curiosity for how
                software shapes the world around us.
              </p>
              <p>
                My interests sit at the intersection of{" "}
                <span className="text-primary font-semibold">
                  software development
                </span>{" "}
                and{" "}
                <span className="text-secondary font-semibold">
                  UI/UX design
                </span>
                . I love building things that are not just
                functional but genuinely pleasant to use — every
                pixel and interaction matters to me.
              </p>
              <p>
                I actively compete in{" "}
                <span className="text-foreground font-semibold">
                  hackathons
                </span>{" "}
                and contribute to{" "}
                <span className="text-foreground font-semibold">
                  open-source communities
                </span>
                , believing the fastest way to grow is to ship
                real things, get feedback, and iterate. Each
                project teaches me something new about
                collaboration, problem-framing, and craft.
              </p>
              <p>
                Currently exploring Android development,
                frontend engineering, and data analysis — while
                staying deeply curious about everything else in
                tech.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="md:col-span-2 grid grid-cols-2 gap-5"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: s.gradient,
                        boxShadow: s.shadow,
                      }}
                    >
                      <s.icon size={20} className={s.color} />
                    </div>
                    <div
                      className="text-lg font-bold text-foreground mb-1.5"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {s.label}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── education ────────────────────────────────────────────────────────────────

function Education() {
  return (
    <section id="education" className="py-32 px-6 relative">
      {/* soft glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel
              eyebrow="Academic Background"
              title="Education"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden"
              >
                <GlassCard className="p-7 h-full relative overflow-hidden">
                  {/* gradient border glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))",
                      filter: "blur(20px)",
                      transform:
                        "translate(-50%, -50%) scale(0.95)",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  <div className="relative z-10">
                    {/* left accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary via-secondary to-transparent" />

                    <div className="flex items-center gap-2 mb-6 pl-4">
                      <span className="text-xs font-semibold text-muted-foreground/80 tracking-wider uppercase">
                        {edu.year}
                      </span>
                      {edu.status === "ongoing" && (
                        <span
                          className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                          style={{
                            background:
                              "rgba(16, 185, 129, 0.15)",
                            border:
                              "1px solid rgba(16, 185, 129, 0.3)",
                            color: "#10B981",
                          }}
                        >
                          Ongoing
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 pl-4"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 pl-4">
                      {edu.institution}
                    </p>

                    <div className="pl-4">
                      <div
                        className="text-4xl font-extrabold bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {edu.metric}
                      </div>
                      <div className="text-xs text-muted-foreground/70 mt-1 font-medium">
                        {edu.unit}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── hackathons ───────────────────────────────────────────────────────────────

function Hackathons() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel
              eyebrow="Hackathons & Projects"
              title="What I've Built"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HACKATHONS.map((h, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <GlassCard className="p-7 h-full flex flex-col relative overflow-hidden">
                  {/* hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at top right, rgba(139, 92, 246, 0.3), transparent 60%)",
                      filter: "blur(30px)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))",
                          border:
                            "1px solid rgba(139, 92, 246, 0.3)",
                          boxShadow:
                            "0 0 25px rgba(139, 92, 246, 0.3)",
                        }}
                      >
                        <Trophy
                          size={20}
                          className="text-primary"
                        />
                      </div>
                      <span
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold ${BADGE_STYLE[h.badge]}`}
                      >
                        {h.position}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {h.title}
                    </h3>
                    <p className="text-sm text-primary/80 font-semibold mb-4">
                      {h.event}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {h.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {h.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 hover:scale-105"
                          style={{
                            background:
                              "rgba(59, 130, 246, 0.1)",
                            border:
                              "1px solid rgba(59, 130, 246, 0.2)",
                            color: "#94A3B8",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── community ────────────────────────────────────────────────────────────────

function Community() {
  return (
    <section id="community" className="py-32 px-6 relative">
      {/* soft glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel
              eyebrow="Leadership & Community"
              title="Getting Involved"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {COMMUNITY.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <GlassCard className="p-7 flex gap-6 relative overflow-hidden">
                  {/* hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at left center, ${
                        item.color === "text-green-400"
                          ? "rgba(16, 185, 129, 0.2)"
                          : item.color === "text-primary"
                            ? "rgba(139, 92, 246, 0.2)"
                            : item.color === "text-blue-400"
                              ? "rgba(59, 130, 246, 0.2)"
                              : "rgba(139, 92, 246, 0.2)"
                      }, transparent 70%)`,
                      filter: "blur(30px)",
                    }}
                  />

                  <div className="relative z-10 flex gap-6 w-full">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          item.color === "text-green-400"
                            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))"
                            : item.color === "text-primary"
                              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))"
                              : item.color === "text-blue-400"
                                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))"
                                : "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))",
                        border:
                          "1px solid " +
                          (item.color === "text-green-400"
                            ? "rgba(16, 185, 129, 0.3)"
                            : item.color === "text-primary"
                              ? "rgba(139, 92, 246, 0.3)"
                              : item.color === "text-blue-400"
                                ? "rgba(59, 130, 246, 0.3)"
                                : "rgba(139, 92, 246, 0.3)"),
                        boxShadow:
                          item.color === "text-green-400"
                            ? "0 0 25px rgba(16, 185, 129, 0.3)"
                            : item.color === "text-primary"
                              ? "0 0 25px rgba(139, 92, 246, 0.3)"
                              : item.color === "text-blue-400"
                                ? "0 0 25px rgba(59, 130, 246, 0.3)"
                                : "0 0 25px rgba(139, 92, 246, 0.3)",
                      }}
                    >
                      <item.icon
                        size={22}
                        className={item.color}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1.5"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {item.role}
                      </h3>
                      <p className="text-sm text-primary/80 font-semibold mb-3">
                        {item.org}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel
              eyebrow="Technical Stack"
              title="Skills & Tools"
            />
          </motion.div>

          <div className="space-y-10">
            {Object.entries(SKILLS).map(
              ([category, { items, color }]) => (
                <motion.div key={category} variants={fadeUp}>
                  <h3
                    className="text-sm font-bold uppercase tracking-[0.2em] mb-5"
                    style={{
                      background:
                        "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold cursor-default transition-all duration-300 ${color}`}
                        style={{
                          boxShadow:
                            "0 4px 15px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── contact ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="relative p-16 md:p-24 rounded-3xl overflow-hidden text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(19, 24, 41, 0.8), rgba(11, 16, 32, 0.95))",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1) inset",
            }}
          >
            {/* top gradient glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full blur-[100px] pointer-events-none opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse, #8B5CF6 0%, transparent 70%)",
              }}
            />
            {/* bottom gradient glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-40 rounded-full blur-[90px] pointer-events-none opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse, #3B82F6 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <motion.span
                variants={fadeUp}
                className="text-xs font-bold tracking-[0.25em] uppercase block mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Get In Touch
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-5xl md:text-6xl font-extrabold text-foreground mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Let&apos;s Connect
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 leading-relaxed"
              >
                Open to internships, collaborative projects, and
                opportunities to learn and grow in tech.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <a
                  href="mailto:jpriyanshi121@gmail.com"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
                    color: "#F8FAFC",
                    boxShadow:
                      "0 8px 30px rgba(139, 92, 246, 0.5)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail size={18} className="relative z-10" />
                  <span className="relative z-10">
                    Say Hello
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/priyanshi-jain-003550367/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderColor: "rgba(139, 92, 246, 0.3)",
                    color: "#F8FAFC",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/jpriyanshi121-cyber/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    color: "#F8FAFC",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Github size={18} />
                  GitHub
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="py-10 px-6 relative"
      style={{
        borderTop: "1px solid rgba(139, 92, 246, 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <span className="text-sm text-muted-foreground">
          © 2025{" "}
          <span className="text-foreground font-semibold">
            Priyanshi Jain
          </span>{" "}
          · Crafted with curiosity & code
        </span>
        <div className="flex items-center gap-6">
          {[
            { Icon: Github, href: "https://github.com/" },
            { Icon: Linkedin, href: "https://linkedin.com/" },
            {
              Icon: Mail,
              href: "mailto:priyanshijain@email.com",
            },
          ].map(({ Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── app ──────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div
      className="min-h-screen antialiased relative overflow-x-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "linear-gradient(to bottom, #0B1020 0%, #0F1528 50%, #0B1020 100%)",
      }}
    >
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(0.6deg); }
          66% { transform: translateY(-6px) rotate(-0.6deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(0.4deg); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(11, 16, 32, 0.5); }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4));
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6));
        }
        ::selection {
          background: rgba(139, 92, 246, 0.4);
          color: #F8FAFC;
        }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Hackathons />
      <Community />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}