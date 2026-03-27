import { FaJava, FaMagic, FaPlug } from "react-icons/fa"; // <--- Added FaMagic (GSAP), FaPlug (Socket)
import { BsFiletypeXml, BsPlugin, BsBox } from "react-icons/bs"; // <--- Added BsBox (Three.js)
import { 
  SiJavascript, SiReact, SiNodedotjs, SiHtml5, SiCss3, SiTailwindcss, 
  SiPhp, SiNextdotjs, SiBootstrap, SiExpress, SiMongodb, SiPostgresql, 
  SiGit, SiGithub, SiFirebase, SiPostman, SiThunderbird, 
  SiCplusplus, SiKotlin, SiAndroidstudio, SiJetpackcompose, SiFastapi,
  SiRedux, SiVuedotjs 
  // REMOVED: SiThreejs, SiGreensock, SiSocketdotio (These were causing the crash)
} from "react-icons/si";

const skills = [
  // --- ORBIT 1: PROGRAMMING LANGUAGES ---
  {
    id: "js", 
    name: "JavaScript", 
    level: "expert", 
    orbit: 1,
    description: "The language of the web. ES6+, Async/Await, and DOM manipulation mastery.",
    color: "#F7DF1E", 
    icon: SiJavascript,
    metrics: { mastery: 83, usage: 82, love: 90 },
    related: ["html", "css", "react", "node", "next", "express", "threejs", "gsap", "redux", "vue", "socketio"] 
  },
  {
    id: "html", name: "HTML", level: "expert", orbit: 1,
    description: "Semantic markup and accessibility standards.",
    color: "#E34F26", icon: SiHtml5,
    metrics: { mastery: 82, usage: 83, love: 80 },
    related: ["css", "js", "vue"]
  },
  {
    id: "css", name: "CSS", level: "expert", orbit: 1,
    description: "Responsive design, animations, and layout mastery.",
    color: "#1572B6", icon: SiCss3,
    metrics: { mastery: 81, usage: 82, love: 85 },
    related: ["html", "js", "tailwind", "bootstrap", "gsap", "vue"]
  },
  {
    id: "java", name: "Java", level: "advanced", orbit: 1,
    description: "Object-oriented programming, JVM internals, and enterprise-grade systems.",
    color: "#007396", icon: FaJava,
    metrics: { mastery: 74, usage: 60, love: 70 },
    related: ["kotlin", "android"]
  },
  {
    id: "cpp", name: "C++", level: "intermediate", orbit: 1,
    description: "Memory management, pointers, and high-performance algorithms.",
    color: "#00599C", icon: SiCplusplus,
    metrics: { mastery: 65, usage: 52, love: 65 },
    related: []
  },
  {
    id: "kotlin", name: "Kotlin", level: "advanced", orbit: 1,
    description: "Modern Android development, coroutines, and null-safety.",
    color: "#7F52FF", icon: SiKotlin,
    metrics: { mastery: 72, usage: 68, love: 95 },
    related: ["java", "android", "compose"]
  },
  {
    id: "php", name: "PHP", level: "intermediate", orbit: 1,
    description: "Server-side scripting and dynamic web page generation.",
    color: "#777BB4", icon: SiPhp,
    metrics: { mastery: 68, usage: 50, love: 50 },
    related: ["html", "css", "js"]
  },

  // --- ORBIT 2: FRAMEWORKS & LIBRARIES ---
  {
    id: "React.js", 
    name: "React.js", 
    level: "expert", 
    orbit: 2,
    description: "Component-based UI, hooks, and state management.",
    color: "#61DAFB", 
    icon: SiReact,
    metrics: { mastery: 82, usage: 83, love: 100 },
    related: ["js", "next", "tailwind", "threejs", "gsap", "redux", "socketio"] 
  },
  {
    id: "redux", 
    name: "Redux", 
    level: "expert", 
    orbit: 2,
    description: "Predictable state container for JavaScript apps.",
    color: "#764ABC", 
    icon: SiRedux,
    metrics: { mastery: 78, usage: 75, love: 80 },
    related: ["react", "js"]
  },
  {
    id: "vue", 
    name: "Vue.js", 
    level: "advanced", 
    orbit: 2,
    description: "Progressive JavaScript framework for building UIs.",
    color: "#4FC08D", 
    icon: SiVuedotjs,
    metrics: { mastery: 72, usage: 55, love: 85 },
    related: ["js", "html", "css", "gsap"]
  },
  {
    id: "socketio", 
    name: "Socket.io", 
    level: "advanced", 
    orbit: 2,
    description: "Bidirectional and low-latency real-time communication.",
    color: "#ffffff", 
    icon: FaPlug,
    metrics: { mastery: 75, usage: 60, love: 90 },
    related: ["node", "express", "react", "js"]
  },
  {
    id: "threejs", 
    name: "Three.js", 
    level: "advanced", 
    orbit: 2,
    description: "3D library for creating immersive WebGL experiences.",
    color: "#ffffff", 
    icon: BsBox,
    metrics: { mastery: 76, usage: 62, love: 95 },
    related: ["js", "react", "gsap"]
  },
  {
    id: "gsap", 
    name: "GSAP", 
    level: "expert", 
    orbit: 2,
    description: "Professional-grade JavaScript animation library.",
    color: "#88CE02", 
    icon: FaMagic,
    metrics: { mastery: 79, usage: 72, love: 100 },
    related: ["js", "react", "html", "threejs", "vue"]
  },
  {
    id: "node", 
    name: "Node.js", 
    level: "advanced", 
    orbit: 2,
    description: "Event-driven architecture and non-blocking I/O.",
    color: "#339933", 
    icon: SiNodedotjs,
    metrics: { mastery: 78, usage: 78, love: 85 },
    related: ["js", "express", "mongo", "socketio"]
  },
  {
    id: "next", 
    name: "Next.js", 
    level: "expert", 
    orbit: 2,
    description: "SSR, SSG, and full-stack React capabilities.",
    color: "#ffffff", 
    icon: SiNextdotjs,
    metrics: { mastery: 80, usage: 81, love: 98 },
    related: ["react", "js", "tailwind"]
  },
  {
    id: "express", 
    name: "Express", 
    level: "advanced", 
    orbit: 2,
    description: "Minimalist web framework for Node.js APIs.",
    color: "#ffffff", 
    icon: SiExpress,
    metrics: { mastery: 77, usage: 75, love: 80 },
    related: ["node", "js", "mongo", "socketio"]
  },
  {
    id: "tailwind", 
    name: "Tailwind", 
    level: "expert", 
    orbit: 2,
    description: "Utility-first CSS framework for rapid UI development.",
    color: "#38BDF8", 
    icon: SiTailwindcss,
    metrics: { mastery: 83, usage: 83, love: 100 },
    related: ["css", "react", "next", "html", "vue"]
  },
  {
    id: "compose", 
    name: "JetPack Compose", 
    level: "advanced", 
    orbit: 2,
    description: "Modern toolkit for building native Android UI.",
    color: "#4285F4", 
    icon: SiJetpackcompose,
    metrics: { mastery: 72, usage: 65, love: 92 },
    related: ["kotlin", "android"]
  },
  {
    id: "bootstrap", 
    name: "Bootstrap", 
    level: "intermediate", 
    orbit: 2,
    description: "Responsive grid system and prebuilt components.",
    color: "#7952B3", 
    icon: SiBootstrap,
    metrics: { mastery: 78, usage: 50, love: 40 },
    related: ["css", "html"]
  },
  {
    id: "fastapi", name: "FastAPI", level: "intermediate", orbit: 2,
    description: "High-performance Python web framework for APIs.",
    color: "#009688", icon: SiFastapi,
    metrics: { mastery: 65, usage: 52, love: 85 },
    related: []
  },

  // --- ORBIT 3: DATABASES ---
  {
    id: "mongo", name: "MongoDB", level: "advanced", orbit: 3,
    description: "NoSQL database design and aggregation pipelines.",
    color: "#47A248", icon: SiMongodb,
    metrics: { mastery: 76, usage: 72, love: 85 },
    related: ["node", "express"]
  },
  {
    id: "postgres", name: "PostgreSQL", level: "intermediate", orbit: 3,
    description: "Relational database management and complex queries.",
    color: "#4169E1", icon: SiPostgresql,
    metrics: { mastery: 68, usage: 55, love: 80 },
    related: ["node"]
  },
  {
    id: "firebase", name: "Firebase", level: "advanced", orbit: 3,
    description: "Backend-as-a-Service, auth, and realtime DB.",
    color: "#FFCA28", icon: SiFirebase,
    metrics: { mastery: 77, usage: 60, love: 90 },
    related: ["react", "android", "vue"]
  },

  // --- ORBIT 4: TOOLS & PLATFORMS ---
  {
    id: "git", name: "Git", level: "expert", orbit: 4,
    description: "Version control, branching strategies, and merging.",
    color: "#F05032", icon: SiGit,
    metrics: { mastery: 82, usage: 83, love: 95 },
    related: ["github"]
  },
  {
    id: "github", name: "GitHub", level: "expert", orbit: 4,
    description: "Collaboration, actions, and project management.",
    color: "#ffffff", icon: SiGithub,
    metrics: { mastery: 82, usage: 83, love: 95 },
    related: ["git"]
  },
  {
    id: "android", name: "Android Studio", level: "advanced", orbit: 4,
    description: "Native Android development environment and tools.",
    color: "#3DDC84", icon: SiAndroidstudio,
    metrics: { mastery: 76, usage: 65, love: 88 },
    related: ["kotlin", "java", "xml", "compose"]
  },
  {
    id: "postman", name: "Postman", level: "advanced", orbit: 4,
    description: "API testing, documentation, and automation.",
    color: "#FF6C37", icon: SiPostman,
    metrics: { mastery: 79, usage: 72, love: 85 },
    related: ["node", "express", "fastapi"]
  },
  {
    id: "thunder", name: "Thunder Client", level: "advanced", orbit: 4,
    description: "Lightweight API testing directly in VS Code.",
    color: "#800080", icon: SiThunderbird,
    metrics: { mastery: 79, usage: 55, love: 85 },
    related: []
  },
  {
    id: "xml", name: "XML", level: "intermediate", orbit: 4,
    description: "Data transport and Android layout definitions.",
    color: "#FFA500", icon: BsFiletypeXml,
    metrics: { mastery: 72, usage: 52, love: 50 },
    related: ["android"]
  },
  {
    id: "plugins", name: "Plugins", level: "expert", orbit: 4,
    description: "Extension development and integration.",
    color: "#00E676", icon: BsPlugin,
    metrics: { mastery: 76, usage: 65, love: 75 },
    related: []
  },
]

export default skills;