/**
 * ONE FILE FOR ALL WEBSITE COPY, FACTS AND PLACEHOLDERS.
 *
 * Rules for editing:
 * - Anything wrapped in [square brackets] is a placeholder. The site
 *   automatically shows it with a dashed amber "placeholder" style, so it is
 *   easy to spot. Replace the whole string (brackets included) with real text.
 * - Company facts (name, Oceanport NJ location, NJ registration, BuildZoom
 *   score, New Home Warranty listing, owner and the Long Branch case study)
 *   are confirmed. The story, services and case study wording are drafts
 *   pending Bill's approval. Phone, email and dashboard data are samples.
 * - No made-up reviews, project counts, years, prices or awards.
 * - Images under /public/images are generated placeholders, not real projects.
 */

export type StatusTone = "done" | "progress" | "blocked";

export const company = {
  name: "Cross Point Construction",
  legalName: "Cross Point Construction LLC",
  principal: "William “Bill” Mangan",
  principalTitle: "[Owner title, confirm with Bill]",
  principalRole:
    "Bill leads field operations and superintendent work. He's hands-on on site and manages the crews. He works alongside Bem, who handles project management, numbers, finance and admin.",
  address: {
    full: "Oceanport, New Jersey",
  },
  serviceArea: "[Service area]",
  licenseNumber: "13VH08903400",
  tagline: "[Company tagline]",
  phone: "(555) 010-0100",
  email: "hello@example.com",
  logo: "[Company logo]",
};

export const demoBanner =
  "Demo website for Cross Point Construction. Anything in [brackets] is a placeholder.";

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
  { href: "/ai", label: "CPC AI Assistant", short: "CPC AI", note: "Demo" },
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
    title: "Cross Point Construction",
    sub: "A builder for new homes, apartments and renovations.",
    primaryCta: { label: "Start your project", href: "/contact" },
    secondaryCta: { label: "See our work", href: "/portfolio" },
  },
  trust: [
    {
      title: "Registered NJ Home Improvement Contractor",
      detail: `Registration ${company.licenseNumber}`,
      status: "",
    },
    {
      title: "Insured",
      detail: "[Insurance details]",
      status: "pending",
    },
    {
      title: "Based in Oceanport, NJ",
      detail: "Monmouth County, Jersey Shore",
      status: "",
    },
  ],
  featuredIntro: {
    eyebrow: "Featured project",
    title: "Long Branch rental building",
    sub: "Pending Bill's approval",
  },
  servicesIntro: {
    eyebrow: "What we build",
    title: "The work, at a glance.",
    sub: "Draft service list.",
  },
  aboutTeaser: {
    eyebrow: "The builder",
    title: "Meet the owner",
    body: company.principalRole,
    line: `${company.principal}, ${company.name}`,
    cta: { label: "Read our story", href: "/about" },
  },
  finalCta: {
    title: "Have a project in mind?",
    sub: "Tell us what you want to build. It takes about two minutes.",
    cta: { label: "Start your project", href: "/contact" },
  },
};

export const featuredProject = {
  name: "Long Branch rental building",
  address: "Long Branch, New Jersey",
  city: "Long Branch",
  category: "Multifamily",
  type: "Multifamily rental building",
  safeLine:
    "A completed 53-unit, four-story multifamily rental building in Long Branch, NJ (2024), built by Bill with Bem.",
  roleNote: "[Our role on this project]",
  stats: [
    { value: 53, label: "Units" },
    { value: 4, label: "Stories" },
    { value: 2024, label: "Completed", plain: true },
  ],
  approvalNote: "Pending Bill's approval of wording and photos",
  summary: "[Project description: scope, our role, what we're proud of]",
  quote: "[Owner quote here]",
  photos: "[Project photos]",
  highlights: ["[Highlight 1]", "[Highlight 2]", "[Highlight 3]"],
};

export const portfolio = {
  intro: {
    eyebrow: "Portfolio",
    title: "Work we can show you.",
    sub: "One case study so far, pending Bill's approval. Empty cards are ready for more.",
  },
  filters: ["All", "Multifamily", "New construction", "Additions", "Remodeling"] as const,
  upcoming: [
    { title: "[Project name]", category: "New construction" },
    { title: "[Project name]", category: "New construction" },
    { title: "[Project name]", category: "Additions" },
    { title: "[Project name]", category: "Remodeling" },
  ],
  upcomingNote: "[Project photo]",
};

export const services = {
  intro: {
    eyebrow: "Services",
    title: "What we build.",
    sub: "Draft service list, pending Bill's approval.",
  },
  status: "Draft",
  items: [
    {
      key: "new-construction",
      title: "New construction",
      icon: "home",
      summary: "Single-family homes and multifamily buildings.",
      details: "[Types of homes, typical scope, areas served]",
    },
    {
      key: "additions",
      title: "Home additions",
      icon: "addition",
      summary: "Additions to existing homes.",
      details: "[Kinds of additions we take on]",
    },
    {
      key: "remodeling",
      title: "Residential remodeling",
      icon: "hammer",
      summary: "Remodeling for existing homes.",
      details: "[Kinds of remodeling work we take on]",
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
    sub: "Cross Point Construction LLC (CPC), a Jersey Shore builder based in Oceanport, New Jersey.",
  },
  story: {
    title: "Our story",
    note: "Draft, pending Bill's approval",
    paragraphs: [
      "[How Bill got started in construction, ask Bill]",
      "CPC is a hands-on, local Jersey Shore builder where the owner is on site, not behind a desk.",
      "Clients can expect the owner on the job, straight answers, and work done to code.",
    ],
    yearsInBusiness: "Since the mid-2010s [confirm exact year with Bill]",
    portrait: "[Photo of the owner]",
  },
  roots: {
    title: "Local roots",
    body: "Oceanport, New Jersey, in Monmouth County on the Jersey Shore.",
    extra: "[Our connection to the area we serve]",
  },
  values: {
    title: "What we stand for",
    note: "Draft, pending Bill's approval",
    items: [
      { title: "The owner on the job", body: "[How we run a job]" },
      { title: "Straight answers", body: "[How we communicate]" },
      { title: "Work done to code", body: "[How we think about quality]" },
    ],
  },
  credentials: {
    title: "Credentials",
    items: [
      {
        label: "NJ Home Improvement Contractor registration",
        value: company.licenseNumber,
        detail: "",
        status: "",
      },
      {
        label: "BuildZoom score",
        value: "91",
        detail: "Top 37% of NJ licensed contractors",
        status: "",
      },
      {
        label: "NJ New Home Warranty program",
        value: "Listed since at least 2017",
        detail: "0 defaults",
        status: "",
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
      title: "CPC AI Assistant",
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
    eyebrow: "CPC AI Assistant preview",
    title: "An assistant that knows your work.",
    sub: "Ask about past projects and the business. It answers only from facts the owner has confirmed, shows where each answer comes from, and says so when it doesn't know.",
  },
  demoLabel: "Demo: scripted answers, no AI connected",
  greeting:
    "Hi, I'm the CPC AI Assistant (demo). Ask me about Cross Point Construction's work. If I don't know something yet, I'll say so.",
  unknown:
    "I don't know yet. The owner hasn't added that information. You can ask directly through the contact page.",
  unknownSource: "Not known yet" as AnswerSource,
  suggestions: [
    "What have you built?",
    "Tell me about the Long Branch building",
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
      answer:
        "Cross Point Construction has been active since at least the mid-2010s. The exact year still needs to be confirmed with Bill.",
      source: "Open question",
    },
    {
      keywords: ["phone", "call", "email", "reach", "contact"],
      answer:
        "This demo lists a sample phone number, (555) 010-0100, and a sample email, hello@example.com. For now, use the contact page.",
      source: "Not known yet",
    },
    {
      keywords: ["buildzoom", "score"],
      answer: "Cross Point Construction has a BuildZoom score of 91, which puts it in the top 37% of NJ licensed contractors.",
      source: "Public record",
    },
    {
      keywords: ["review", "testimonial", "rating"],
      answer: "I don't know yet. No client reviews have been published so far. We only show real reviews.",
      source: "Not known yet",
    },
    {
      keywords: ["warranty"],
      answer:
        "Cross Point Construction has been listed with the NJ New Home Warranty program since at least 2017, with 0 defaults.",
      source: "Public record",
    },
    {
      keywords: ["long branch", "units", "stories", "apartment", "rental"],
      answer:
        "The Long Branch project is a completed 53-unit, four-story multifamily rental building in Long Branch, NJ (2024), built by Bill with Bem. Bill still needs to approve the write-up and photos.",
      source: "Reported by the owner",
    },
    {
      keywords: ["built", "projects", "past work", "portfolio", "work"],
      answer:
        "The project I can tell you about is a completed 53-unit, four-story multifamily rental building in Long Branch, NJ (2024). Other projects haven't been added yet.",
      source: "Reported by the owner",
    },
    {
      keywords: ["where", "located", "address", "office", "based", "area"],
      answer:
        "Cross Point Construction is based in Oceanport, New Jersey, in Monmouth County on the Jersey Shore. The service area hasn't been added yet.",
      source: "Reported by the owner",
    },
    {
      keywords: ["license", "licensed", "registration", "registered", "insured", "insurance"],
      answer: `Cross Point Construction LLC is a registered New Jersey Home Improvement Contractor (registration ${company.licenseNumber}). The insurance certificate hasn't been added yet.`,
      source: "Public record",
    },
    {
      keywords: ["owner", "who", "run", "ceo", "bill", "bem"],
      answer: `The owner is ${company.principal}. ${company.principalRole}`,
      source: "Reported by the owner",
    },
    {
      keywords: ["service", "renovation", "remodel", "addition", "new home", "multifamily", "do you", "house", "home"],
      answer:
        "The draft service list is new construction (single-family and multifamily), home additions, residential remodeling and construction management. Bill still needs to approve it.",
      source: "Open question",
    },
  ] as ChatEntry[],
};

export const footer = {
  blurb: "A builder for new homes, apartments and renovations.",
  legal: "Demo website for Cross Point Construction. Not a live website.",
};
