/* ============================================================
   SITE CONTENT
   Edit everything in this file to update the portfolio's content.
   Nothing here touches markup — index.html just renders these arrays.
   ============================================================ */

// Your GitHub username — used to auto-pull repos + stats live.
const GITHUB_USERNAME = "Hassan285hk";

// Rotating hero roles (order = priority)
const ROLES = [
  "AI Engineer",
  "Flutter Developer",
  "Full-Stack Developer",
  "Graphic Designer",
];

// ---- SKILLS -------------------------------------------------
// level = 0-100, shown as a progress bar. Adjust to your real level.
const SKILLS = [
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", level: 88, group: "Code" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", level: 80, group: "Code" },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B", level: 82, group: "Code" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", level: 85, group: "Code" },
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C", level: 78, group: "Code" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", level: 95, group: "Code" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6", level: 90, group: "Code" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", level: 75, group: "AI & Data" },
  { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00", level: 72, group: "AI & Data" },
  { name: "OpenCV", icon: "https://cdn.simpleicons.org/opencv/5C3EE8", level: 70, group: "AI & Data" },
  { name: "Machine Learning", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E", level: 74, group: "AI & Data" },
  { name: "Git & GitHub", icon: "https://cdn.simpleicons.org/git/F05032", level: 85, group: "Tools" },
  { name: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", level: 76, group: "Tools" },
  { name: "Illustrator", icon: "https://cdn.simpleicons.org/adobeillustrator/FF9A00", level: 88, group: "Design" },
  { name: "Photoshop", icon: "https://cdn.simpleicons.org/adobephotoshop/31A8FF", level: 90, group: "Design" },
  { name: "Canva", icon: "https://cdn.simpleicons.org/canva/00C4CC", level: 92, group: "Design" },
];

// ---- FEATURED DESIGN WORK (real projects, pulled from your live site) ----
const DESIGN_PROJECTS = [
  {
    title: "National Sports Logo",
    desc: "High-impact typography and visual layout for a national sports brand identity.",
    img: "sports-game-logo-260nw-698317408.webp",
    tags: ["Branding", "Logo Design"],
  },
  {
    title: "Event Promotion Poster",
    desc: "High-impact typography and visual layout designed for a delivery brand launch event.",
    img: "Blue Red and White Modern Delivery Logo.png",
    tags: ["Poster", "Typography"],
  },
  {
    title: "Nike Ad Concept",
    desc: "Modern advertisement layout for Nike footwear with bold, high-impact composition.",
    img: "JUST.png",
    tags: ["Advertising", "Layout"],
  },
  {
    title: "Watch Ad Campaign",
    desc: "Modern geometric advertisement and branding guide for a watch product line.",
    img: "JUST (1).png",
    tags: ["Branding", "Advertising"],
  },
  {
    title: "Architect Studio Logo",
    desc: "Black minimalist logo design for an architecture studio, built for versatility across media.",
    img: "Black minimalist architect logo.png",
    tags: ["Logo Design", "Minimalism"],
  },
  {
    title: "Aura — Dark Mode UI",
    desc: "Dark mode interface design mock-up exploring glass surfaces and ambient gradients.",
    img: "Aura.png",
    tags: ["UI/UX", "Dark Mode"],
  },
];

// ---- EXPERIENCE & EDUCATION TIMELINE --------------------------
// Sample structure — replace with your real roles/dates.
const TIMELINE = [
  {
    year: "2026",
    title: "Add your current role",
    org: "Company / Organization",
    type: "work",
    desc: "Short description of your responsibilities and impact — replace this placeholder with your real experience.",
  },
  {
    year: "2025",
    title: "Freelance Graphic & Frontend Work",
    org: "Self-employed",
    type: "work",
    desc: "Designed brand identities, posters and ad layouts while building responsive front-end interfaces.",
  },
  {
    year: "2024",
    title: "Add your degree / program",
    org: "Your University / Institute",
    type: "education",
    desc: "Replace with your real field of study and key coursework (e.g. AI, Data Structures, Software Engineering).",
  },
];

// ---- CERTIFICATES (sample — replace with your real ones) -------
const CERTIFICATES = [
  {
    title: "Add your certificate title",
    issuer: "Issuing platform (Coursera, Google, etc.)",
    date: "2026",
    img: null, // add an image path once you have the certificate file
  },
  {
    title: "Add your certificate title",
    issuer: "Issuing platform",
    date: "2026",
    img: null,
  },
  {
    title: "Add your certificate title",
    issuer: "Issuing platform",
    date: "2026",
    img: null,
  },
];

// ---- STATS (animated counters in About) -------------------------
const STATS = [
  { label: "Design Projects", value: 6 },
  { label: "Core Technologies", value: 16 },
  { label: "Years Learning & Building", value: 3 },
  { label: "Cups of Coffee", value: 240 },
];

// ---- CONTACT / SOCIAL --------------------------------------------
const CONTACT = {
  email: "hassankashif1459@gmail.com",
  phone: "+923214392271",
  whatsapp: "https://wa.me/923214392271",
  linkedin: "https://www.linkedin.com/in/hassan-kashif-03705a348/",
  github: "https://github.com/Hassan285hk",
  resume: "./resume.pdf", // add your resume file at this path
  // Replace with your own Formspree endpoint: https://formspree.io/
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};
