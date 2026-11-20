/**
 * ONE FILE FOR ALL WEBSITE COPY, FACTS AND PLACEHOLDERS.
 *
 * Rules for editing:
 * - Anything wrapped in [square brackets] is a placeholder. The site
 *   automatically shows it with a dashed amber "placeholder" style, so it is
 *   easy to spot. Replace the whole string (brackets included) with real text.
 * - "General Contractor Co." is a generic demo brand. Every name, address,
 *   phone number, email and project here is fictional sample data.
 * - No made-up reviews, project counts, years, prices or awards.
 * - Images under /public/images are generated placeholders, not real projects.
 */

export type StatusTone = "done" | "progress" | "blocked";

export const company = {
  name: "General Contractor Co.",
  legalName: "General Contractor Co. (sample company)",
  principal: "[Owner name]",
  principalTitle: "[Owner's title]",
  address: {
    full: "123 Main Street, Anytown, USA (sample address)",
  },
  serviceArea: "[Service area]",
  licenseNumber: "[License #]",
  tagline: "[Company tagline]",
  phone: "(555) 010-0100",
  email: "hello@example.com",
  logo: "[Company logo]",
};

export const demoBanner =
  "Demo website for a sample builder. Anything in [brackets] is a placeholder.";

export type NavItem = { href: string; label: string; short?: string; note?: string; newTab?: boolean };

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export const demoNav: NavItem[] = [
  { href: "/dashboard", label: "Open Project Dashboard", short: "Dashboard", note: "Demo", newTab: true },
  { href: "/ai", label: "GC AI Assistant", short: "GC AI", note: "Demo" },
];

export const imagePlaceholderNote = "Placeholder image (not a real project).";

export const images = {
  hero: {
    src: "/images/hero-dusk.jpg",
    alt: "Placeholder image: a four-story building under construction at dusk with a tower crane",
  },
  framing: {
    src: "/images/framing-detail.jpg",
    alt: "Placeholder image: close-up of new timber wall framing in warm sunlight",
  },
  blueprints: {
    src: "/images/blueprints.jpg",
    alt: "Placeholder image: rolled blueprints, a pencil and a tape measure on a table",
  },
};

export const home = {
  hero: {
    eyebrow: "Homes, apartments and renovations",
    title: "General Contractor Co.",
    sub: "A builder for new homes, apartments and renovations.",
    primaryCta: { label: "Start your project", href: "/contact" },
    secondaryCta: { label: "See a sample project", href: "/portfolio" },
  },
  trust: [
    {
      title: "Licensed contractor",
      detail: "[License #]",
      status: "pending",
    },
    {
      title: "Insured",
      detail: "[Insurance details]",
      status: "pending",
    },
    {
      title: "Local office",
      detail: "123 Main Street, Anytown, USA (sample)",
      status: "",
    },
  ],
  featuredIntro: {
    eyebrow: "Featured project",
    title: "Linden Place",
    sub: "Sample project",
  },
  servicesIntro: {
    eyebrow: "What we build",
    title: "The work, at a glance.",
    sub: "Sample service list.",
  },
  aboutTeaser: {
    eyebrow: "The builder",
    title: "Meet the owner",
    body: "[Short intro from the owner: who they are and why they build]",
    line: "[Owner name], General Contractor Co.",
    cta: { label: "Read our story", href: "/about" },
  },
  finalCta: {
    title: "Have a project in mind?",
    sub: "Tell us what you want to build. It takes about two minutes.",
    cta: { label: "Start your project", href: "/contact" },
  },
};

export const featuredProject = {
  name: "Linden Place",
  address: "456 Sample Avenue, Anytown, USA (fictional)",
  city: "Anytown",
  category: "Multifamily",
  type: "Multifamily rental building",
  safeLine: "A sample multifamily rental building, shown to demo how a finished project looks on the site.",
  roleNote: "[Our role on this project]",
  stats: [
    { value: 24, label: "Units" },
    { value: 3, label: "Stories" },
    { value: 2024, label: "Completed", plain: true },
  ],
  approvalNote: "Sample project. Swap in a real job and photos.",
  summary: "[Project description: scope, our role, what we're proud of]",
  quote: "[Owner quote here]",
  photos: "[Project photos]",
  highlights: ["[Highlight 1]", "[Highlight 2]", "[Highlight 3]"],
};

export const portfolio = {
  intro: {
    eyebrow: "Portfolio",
    title: "Work we can show you.",
    sub: "One sample project is shown. Empty cards are ready for more.",
  },
  filters: ["All", "Multifamily", "New construction", "Renovations"] as const,
  upcoming: [
    { title: "[Finished house address]", category: "New construction" },
    { title: "[Finished house address]", category: "New construction" },
    { title: "[Current single-family job]", category: "New construction" },
    { title: "[Project name]", category: "Renovations" },
    { title: "[Other completed multifamily job]", category: "Multifamily" },
    { title: "[Project name]", category: "Renovations" },
  ],
  upcomingNote: "[Project photo]",
};

export const services = {
  intro: {
    eyebrow: "Services",
    title: "What we build.",
    sub: "Sample service list.",
  },
  status: "Sample list",
  items: [
    {
      key: "new-construction",
      title: "New construction",
      icon: "home",
      summary: "Ground-up homes, including single-family houses.",
      details: "[Types of homes, typical scope, areas served]",
    },
    {
      key: "multifamily",
      title: "Multifamily",
      icon: "building",
      summary: "Apartment and multi-unit residential buildings.",
      details: "[Multifamily work and our usual role]",
    },
    {
      key: "renovations",
      title: "Renovations",
      icon: "hammer",
      summary: "Remodeling and additions for existing homes.",
      details: "[Kinds of renovation work we take on]",
    },
    {
      key: "construction-management",
      title: "Construction management",
      icon: "clipboard",
      summary: "Running the job site, schedule and trades.",
      details: "[How construction management works]",
    },
  ],
  process: {
    eyebrow: "How it works",
    title: "Simple steps.",
    note: "Sample process.",
    steps: [
      { title: "Talk", body: "You tell us what you want to build." },
      { title: "Plan", body: "[How we scope and plan a project]" },
      { title: "Build", body: "[How we run the job and keep you updated]" },
      { title: "Hand over", body: "[What happens at the end of a project]" },
    ],
  },
};

export const about = {
  intro: {
    eyebrow: "About",
    title: "Built on clear answers.",
    sub: "General Contractor Co. is a sample builder used to demo this website.",
  },
  story: {
    title: "Our story",
    paragraphs: [
      "[How the owner got started in construction]",
      "[Why they started General Contractor Co.]",
      "[What clients can expect working with us]",
    ],
    yearsInBusiness: "[Years in business]",
    portrait: "[Photo of the owner]",
  },
  roots: {
    title: "Local roots",
    body: "Our office is at 123 Main Street, Anytown, USA (sample address).",
    extra: "[Our connection to the area we serve]",
  },
  values: {
    title: "What we stand for",
    note: "Sample values.",
    items: [
      { title: "Clear answers", body: "[How we communicate]" },
      { title: "Clean, organized sites", body: "[How we run a job]" },
      { title: "Done right", body: "[How we think about quality]" },
    ],
  },
  credentials: {
    title: "Credentials",
    items: [
      {
        label: "Contractor license",
        value: "[License #]",
        detail: "",
        status: "pending",
      },
      {
        label: "Insurance",
        value: "[Insurance certificate]",
        detail: "",
        status: "pending",
      },
    ],
  },
  brands: "[Brand / supplier relationships]",
};

export const reviews = {
  intro: {
    eyebrow: "Reviews",
    title: "Reviews coming soon.",
    sub: "We only show real reviews from real clients. None are published yet.",
  },
  emptyTitle: "No reviews yet",
  emptyBody: "Once past clients share their experience, their words will appear here exactly as written.",
  nextSteps: [
    "We send a review link to recent clients",
    "Reviews are posted here with the client's permission",
    "Nothing is edited or made up",
  ],
  cta: { label: "Talk to us", href: "/contact" },
};

export const contact = {
  intro: {
    eyebrow: "Contact",
    title: "Start your project.",
    sub: "A few quick questions. No pressure, no obligation.",
  },
  demoNote: "Demo form. Nothing is sent anywhere.",
  projectTypes: ["New construction", "Multifamily", "Renovation", "Not sure yet"],
  successTitle: "Thanks! (Demo only)",
  successBody: "In the live site, this would go straight to the owner. In this demo nothing was sent.",
  hours: "[Office hours]",
  mapNote: "Map placeholder. A map of the office goes here once a real address is added.",
};

export type AnswerSource = "Public record" | "Reported by the owner" | "Open question" | "Not known yet";

export const demosTeaser = {
  eyebrow: "Beyond the website",
  title: "Two private tools for the owner.",
  sub: "Previews of what comes with the site. Both are demos.",
  items: [
    {
      href: "/dashboard",
      title: "Client dashboard",
      body: "Green, amber, red. Clients see what's done, what's happening and what's next at a glance.",
      icon: "dashboard",
      cta: "Open Project Dashboard",
      newTab: true,
    },
    {
      href: "/ai",
      title: "GC AI Assistant",
      body: "An assistant that answers questions about the company's work from verified facts, and says when it doesn't know.",
      icon: "bot",
      cta: "Open the preview",
      newTab: false,
    },
  ],
};

export type ChatEntry = { keywords: string[]; answer: string; source: AnswerSource };

export const aiBrain = {
  intro: {
    eyebrow: "GC AI Assistant preview",
    title: "An assistant that knows your work.",
    sub: "Ask about past projects and the business. It answers only from facts the owner has confirmed, shows where each answer comes from, and says so when it doesn't know.",
  },
  demoLabel: "Demo: scripted answers, no AI connected",
  greeting:
    "Hi, I'm the GC AI Assistant (demo). Ask me about General Contractor Co.'s work. If I don't know something yet, I'll say so.",
  unknown:
    "I don't know yet. The owner hasn't added that information. You can ask directly through the contact page.",
  unknownSource: "Not known yet" as AnswerSource,
  suggestions: [
    "What have you built?",
    "Tell me about Linden Place",
    "Where are you based?",
    "Are you licensed?",
    "How long have you been in business?",
    "How much does a new home cost?",
  ],
  // First matching entry wins. Keep answers to facts in this file only.
  answers: [
    {
      keywords: ["price", "cost", "how much", "budget", "quote", "estimate"],
      answer:
        "I don't know yet. We don't publish prices. Every project is different, so the best step is to share your project on the contact page.",
      source: "Not known yet",
    },
    {
      keywords: ["years", "how long", "since when", "experience", "founded"],
      answer: "I don't know yet. The owner hasn't added how long the company has been in business.",
      source: "Not known yet",
    },
    {
      keywords: ["phone", "call", "email", "reach", "contact"],
      answer:
        "This demo lists a sample phone number, (555) 010-0100, and a sample email, hello@example.com. For now, use the contact page.",
      source: "Reported by the owner",
    },
    {
      keywords: ["review", "testimonial", "rating"],
      answer: "I don't know yet. No client reviews have been published so far. We only show real reviews.",
      source: "Not known yet",
    },
    {
      keywords: ["linden", "units", "stories", "apartment", "rental"],
      answer:
        "Linden Place is a fictional sample project used in this demo: a multifamily rental building with 24 units over 3 stories, completed in 2024.",
      source: "Reported by the owner",
    },
    {
      keywords: ["built", "projects", "past work", "portfolio", "work"],
      answer:
        "The project I can tell you about is Linden Place, a sample multifamily building (24 units, 3 stories). Other projects haven't been added yet.",
      source: "Reported by the owner",
    },
    {
      keywords: ["where", "located", "address", "office", "based", "area"],
      answer: "This demo uses a sample address: 123 Main Street, Anytown, USA. The service area hasn't been added yet.",
      source: "Reported by the owner",
    },
    {
      keywords: ["license", "licensed", "registration", "registered", "insured", "insurance"],
      answer: "I don't know yet. The license number and insurance certificate haven't been added.",
      source: "Not known yet",
    },
    {
      keywords: ["owner", "who", "run", "ceo"],
      answer: "I don't know yet. The owner's name and bio haven't been added.",
      source: "Not known yet",
    },
    {
      keywords: ["service", "renovation", "new home", "multifamily", "do you", "house", "home"],
      answer:
        "The sample service list is new construction (including single-family homes), multifamily, renovations, and construction management.",
      source: "Open question",
    },
  ] as ChatEntry[],
};

export const footer = {
  blurb: "A builder for new homes, apartments and renovations.",
  legal: "Demo website for General Contractor Co., a sample company. Not a live website.",
};
