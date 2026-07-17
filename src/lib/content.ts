export type Lang = "en" | "pt";

const ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export type Chip = {
  /** Single label used for both languages (technology names). */
  label?: string;
  /** Per-language label (used by architecture concepts). */
  en?: string;
  pt?: string;
  /** Devicon image URL. */
  icon?: string;
  /** Extra styles applied to the icon image (e.g. invert for Next.js). */
  iconStyle?: React.CSSProperties;
  /** Glyph rendered instead of an image. */
  glyph?: string;
};

export type StackCategory = {
  en: string;
  pt: string;
  chips: Chip[];
};

export const NAV_LINKS = [
  { href: "#about", en: "About", pt: "Sobre" },
  { href: "#stack", en: "Stack", pt: "Stack" },
  { href: "#experience", en: "Experience", pt: "Experiência" },
  { href: "#contact", en: "Contact", pt: "Contato" },
];

export const TYPE_WORDS = {
  en: [
    "Full Stack JS Developer",
    "Node.js + NestJS on the back",
    "React + Next.js on the front",
    "DDD & Hexagonal Architecture",
  ],
  pt: [
    "Desenvolvedor Full Stack JS",
    "Node.js + NestJS no back-end",
    "React + Next.js no front-end",
    "DDD & Arquitetura Hexagonal",
  ],
};

export const STATS = [
  {
    since: 2025,
    suffix: "+",
    en: "// years as a developer",
    pt: "// anos como desenvolvedor",
  },
  {
    to: 20,
    suffix: "+",
    en: "// technologies mastered",
    pt: "// tecnologias dominadas",
  },
  {
    to: 10,
    suffix: "+",
    en: "// projects built",
    pt: "// projetos desenvolvidos",
  },
  { to: 100, suffix: "%", en: "// Clean Code", pt: "// código limpo" },
];

export const STACK: StackCategory[] = [
  {
    en: "Front-end",
    pt: "Front-end",
    chips: [
      { label: "HTML5", icon: `${ICON}/html5/html5-original.svg` },
      { label: "CSS3", icon: `${ICON}/css3/css3-original.svg` },
      { label: "Sass", icon: `${ICON}/sass/sass-original.svg` },
      { label: "JavaScript", icon: `${ICON}/javascript/javascript-original.svg` },
      { label: "TypeScript", icon: `${ICON}/typescript/typescript-original.svg` },
      { label: "React", icon: `${ICON}/react/react-original.svg` },
      {
        label: "Next.js",
        icon: `${ICON}/nextjs/nextjs-original.svg`,
        iconStyle: { filter: "invert(1)" },
      },
      {
        label: "TailwindCSS",
        icon: `${ICON}/tailwindcss/tailwindcss-original.svg`,
      },
      { label: "Jest", icon: `${ICON}/jest/jest-plain.svg` },
    ],
  },
  {
    en: "Back-end",
    pt: "Back-end",
    chips: [
      { label: "Node.js", icon: `${ICON}/nodejs/nodejs-original.svg` },
      { label: "NestJS", icon: `${ICON}/nestjs/nestjs-original.svg` },
      { label: "Jest", icon: `${ICON}/jest/jest-plain.svg` },
    ],
  },
  {
    en: "Database",
    pt: "Banco de Dados",
    chips: [
      {
        label: "SQL Server",
        icon: `${ICON}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
      },
      { label: "MySQL", icon: `${ICON}/mysql/mysql-original.svg` },
    ],
  },
  {
    en: "Desktop",
    pt: "Desktop",
    chips: [
      { label: "Electron", icon: `${ICON}/electron/electron-original.svg` },
      { label: "Tauri", icon: `${ICON}/tauri/tauri-original.svg` },
    ],
  },
  {
    en: "DevOps",
    pt: "DevOps",
    chips: [{ label: "Docker", icon: `${ICON}/docker/docker-original.svg` }],
  },
  {
    en: "Mobile",
    pt: "Mobile",
    chips: [
      { label: "React Native", icon: `${ICON}/react/react-original.svg` },
    ],
  },
  {
    en: "Architecture",
    pt: "Arquitetura",
    chips: [
      { glyph: "⬡", en: "Hexagonal Architecture", pt: "Arquitetura Hexagonal" },
      { glyph: "▤", en: "Use Cases", pt: "Casos de Uso" },
      { glyph: "◈", en: "Entity Models", pt: "Modelos com Entidades" },
      { glyph: "◆", en: "DDD", pt: "DDD" },
    ],
  },
  {
    en: "Other",
    pt: "Outros",
    chips: [
      { label: "Windows", icon: `${ICON}/windows11/windows11-original.svg` },
      { label: "Linux", icon: `${ICON}/linux/linux-original.svg` },
      { label: "Git", icon: `${ICON}/git/git-original.svg` },
    ],
  },
];

export const EXPERIENCE_BULLETS = [
  {
    en: "Develop APIs and microservices with NestJS and Node.js, applying clean architecture and automated testing (unit and E2E) with Jest.",
    pt: "Desenvolvo APIs e microsserviços utilizando NestJS e Node.js, aplicando arquitetura limpa e testes automatizados (unitários e E2E) com Jest.",
  },
  {
    en: "Built the corporate app in React Native, used by 100+ employees, and was also responsible for publishing it on Google Play and the App Store.",
    pt: "Desenvolvi o aplicativo corporativo em React Native, utilizado por mais de 100 colaboradores, sendo responsável também pela publicação na Google Play e App Store.",
  },
  {
    en: "Conceived and built the company's new services platform, migrating 30+ legacy Delphi services to a modern JavaScript architecture using Turborepo, IPC communication, process management (SIGTERM) and a scalable structure for new services.",
    pt: "Idealizei e desenvolvi a nova plataforma de serviços da empresa, migrando mais de 30 serviços legados em Delphi para uma arquitetura moderna em JavaScript, utilizando Turborepo, comunicação via IPC, gerenciamento de processos (SIGTERM) e uma estrutura escalável para novos serviços.",
  },
];

/** Free-text strings keyed by language. Values may contain inline HTML. */
export const I18N = {
  navCv: { en: "CV ↓", pt: "CV ↓" },
  heroWhoami: { en: "$ whoami", pt: "$ whoami" },
  heroDesc: {
    en: "// Full Stack JavaScript developer specialized in building scalable web applications, focused on architecture, APIs, databases and modern interfaces.",
    pt: "// Desenvolvedor Full Stack JavaScript especializado na construção de aplicações web escaláveis, com foco em arquitetura, APIs, bancos de dados e interfaces modernas.",
  },
  heroStatus: { en: "● online · rendering...", pt: "● online · rendering..." },
  aboutTag: { en: "// about.md", pt: "// about.md" },
  aboutHeading: {
    en: "Engineering that scales — <span style='color:#a78bfa;'>from database to pixel.</span>",
    pt: "Engenharia que escala — <span style='color:#a78bfa;'>do banco ao pixel.</span>",
  },
  aboutBody: {
    en: "I build complete applications, combining solid back-end architecture with modern, performant and accessible front-end interfaces.",
    pt: "Desenvolvo aplicações completas, combinando arquitetura sólida no back-end com interfaces modernas, performáticas e acessíveis no front-end.",
  },
  stackTag: { en: "// stack.json", pt: "// stack.json" },
  expTag: { en: "$ cat experience.log", pt: "$ cat experience.log" },
  expHeading: {
    en: "Where I've been building",
    pt: "Onde venho construindo",
  },
  expRole: {
    en: "Full Stack Developer — Adina",
    pt: "Desenvolvedor Full Stack — Adina",
  },
  expPeriod: { en: "2025 — Present", pt: "2025 — Atual" },
  expClosing: {
    en: "> Started my journey with JavaScript and never stopped shipping.",
    pt: "> Comecei minha jornada com JavaScript e nunca parei de entregar.",
  },
  contactTag: { en: "$ ./connect", pt: "$ ./connect" },
  contactHeading: {
    en: "Let's build something<br>that lasts.",
    pt: "Vamos construir algo<br>que dure.",
  },
  contactSub: {
    en: "// available for full-stack opportunities and freelance work",
    pt: "// disponível para oportunidades Full Stack e trabalhos freelance",
  },
  contactResume: { en: "Download Resume", pt: "Download Currículo" },
  footerBuilt: {
    en: "built with JavaScript, coffee & clean code",
    pt: "feito com JavaScript, café & clean code",
  },
} as const;

export const CONTACT_LINKS = {
  email: "mailto:adrianoamaral1621@gmail.com",
  linkedin: "https://www.linkedin.com/in/adrianoboulhosadev",
  github: "https://github.com/adrianoboulhosadev",
  whatsapp: "https://wa.me/5521999552683",
};
