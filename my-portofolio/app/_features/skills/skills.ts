export const skillGroups = [
  { name: "Languages", skills: [{ name: "HTML", icon: "html5" }, { name: "CSS", icon: "css3" }, { name: "JavaScript", icon: "javascript" }, { name: "TypeScript", icon: "typescript" }] },
  { name: "Frontend", skills: [{ name: "React", icon: "react" }, { name: "Next.js", icon: "nextjs", monochrome: true }, { name: "Redux", icon: "redux" }, { name: "Tailwind CSS", icon: "tailwindcss" }, { name: "Bootstrap", icon: "bootstrap" }] },
  { name: "Backend & APIs", skills: [{ name: "Node.js", icon: "nodejs" }, { name: "Express.js", icon: "express", monochrome: true }, { name: "GraphQL", icon: "graphql" }, { name: "Socket.io", icon: "socketio", monochrome: true }, { name: "Apollo", icon: "apollographql", monochrome: true }] },
  { name: "AI & cloud", skills: [{ name: "Gemini API", icon: "gemini-color" }, { name: "OpenAI", icon: "openai", monochrome: true }, { name: "AWS", icon: "amazonwebservices" }] },
  { name: "Databases & services", skills: [{ name: "PostgreSQL", icon: "postgresql" }, { name: "MongoDB", icon: "mongodb" }, { name: "Supabase", icon: "supabase" }, { name: "Redis", icon: "redis" }, { name: "Sequelize", icon: "sequelize" }] },
  { name: "Mobile", skills: [{ name: "React Native", icon: "reactnative" }, { name: "Expo", icon: "expo", monochrome: true }] },
  { name: "Tools & testing", skills: [{ name: "Git", icon: "git" }, { name: "Jest", icon: "jest" }, { name: "Postman", icon: "postman" }, { name: "Vercel", icon: "vercel", monochrome: true }] },
];

// Curated overview; additional technologies stay in the complete catalogue.
const overviewNames = new Set([
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "Express.js", "PostgreSQL", "MongoDB", "React Native", "Expo", "Git", "Postman",
  "Gemini API", "OpenAI",
]);

export const overviewSkillGroups = skillGroups
  .map(group => ({ ...group, skills: group.skills.filter(skill => overviewNames.has(skill.name)) }))
  .filter(group => group.skills.length > 0);
