import Image from "next/image";
import SolarSystem from "./solar-system";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

const projects = [
  { name: "Bastionfall", kind: "AI-powered fantasy city defense", role: "Backend developer", date: "NOV 2026", stack: ["TypeScript", "Next.js", "Gemini API", "Zod"], text: "A 100-day campaign where every choice has consequences. I built the game engine, AI-generated events, and resilient validation and fallbacks in a team of three.", url: "https://bastionfall.alicemorgan.my.id", art: "bastion" },
  { name: "Hacktiv Chess Ultimate", kind: "Real-time multiplayer chess", role: "Backend developer", date: "OCT 2026", stack: ["Node.js", "Socket.io", "PostgreSQL", "Supabase"], text: "From matchmaking to the final move. I built real-time synchronization, server-side move validation, and session recovery for a multiplayer chess app.", url: "https://hacktive-chess.vercel.app", art: "chess" },
  { name: "Alice Store", kind: "Full-stack laptop catalog", role: "Full-stack developer", date: "NOV 2026", stack: ["Next.js", "React", "MongoDB", "JWT"], text: "A laptop catalog with product categories, detailed specifications, and authentication. Built with MongoDB persistence, JWT, and validated user input.", url: "https://alice-store.alicemorgan.my.id", art: "store" },
  { name: "Tempat Gosip", kind: "Social media, made mobile", role: "Full-stack developer", date: "OCT 2026", stack: ["React Native", "Expo", "GraphQL", "MongoDB"], text: "A mobile social app for sharing posts and staying connected. I built social interactions, a GraphQL API, and secure device sessions.", url: "https://shorturl.at/CjctA", art: "social" },
  { name: "Animal Quiz", kind: "Learning through play", role: "Web application", date: "", stack: [], text: "An animal-learning experience for children, with learning cards, playful quizzes, and parent accounts. A colorful way to discover the animal world, one question at a time.", url: "https://individual.alicemorgan.my.id/", art: "animal" },
];

function ProjectArt({ type }: { type: string }) {
  const screenshots: Record<string, { src: string; alt: string }> = {
    bastion: { src: "/projects/bastionfall.jpg", alt: "Bastionfall gameplay showing the city, resource management, and an incoming Orc Host wave" },
    chess: { src: "/projects/hacktiv-chess.jpg", alt: "Hacktiv Chess Ultimate lobby with multiplayer matchmaking, Stockfish, and tactical puzzles" },
    animal: { src: "/projects/animal-quiz.jpg", alt: "Animal Quiz homepage with animal learning cards and a start-adventure button" },
    social: { src: "/projects/tempat-gosip-showcase.png", alt: "Tempat Gosip mobile app showcase featuring sign-in, home feed, profile, and account creation screens" },
  };
  const screenshot = screenshots[type];
  if (screenshot) return <div className={`project-art project-screenshot project-screenshot-${type}`}><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1416px) calc((100vw - 130px) / 2), 643px" /></div>;
  if (type === "store") return <div className="project-art store-art" aria-hidden="true"><div className="art-topline"><span>alice store<span className="orange">.</span></span><span>FIND YOUR NEXT LAPTOP</span></div><div className="store-composition"><div><span className="store-small">BUILT FOR YOUR EVERYDAY</span><strong>Your next<br/>great idea<br/>starts here.</strong></div><div className="laptop"><div className="laptop-screen"><span>a<span className="orange">.</span></span></div><div className="laptop-base"/></div></div></div>;
  return null;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header container">
      <a className="wordmark" href="#" aria-label="Otniel home"><svg width="44" height="36" viewBox="0 0 48 40" fill="none" aria-hidden="true"><ellipse cx="24" cy="20" rx="23" ry="12" transform="rotate(-28 24 20)" stroke="currentColor" strokeWidth="1.3"/><circle cx="24" cy="20" r="7" fill="#bc4925"/><circle cx="42" cy="8" r="3" fill="currentColor"/></svg>otniel<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact <Arrow diagonal/></a></nav>
    </header>
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy"><h1 id="hero-title">Software developer.<br/><span>Curious by nature.</span></h1><p>Hi, I’m <strong>Otniel Rahadiyan Sumantri.</strong><br/>A junior full-stack developer building thoughtful web and mobile experiences, from the interface to the API.</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <Arrow/></a><a className="button button-secondary" href="/otniel-resume.pdf" target="_blank" rel="noopener noreferrer">View résumé <Arrow diagonal/></a></div><div className="hero-location"><span className="location-dot"/>Based on Earth. Jakarta, to be precise.</div></div>
        <SolarSystem/>
      </section>
      <section className="work-section container" id="work" aria-labelledby="work-title">
        <div className="section-heading"><h2 id="work-title">Selected work<span>.</span></h2><p>Ideas brought down to Earth.</p><div className="mini-system" aria-hidden="true"><i/><i/><i/><i/><i/></div></div>
        <div className="project-grid">
          {projects.map(project => (
            <article className="project" key={project.name}>
              <a className="project-image-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live project`}>
                <ProjectArt type={project.art}/>
                <span className="project-open"><Arrow diagonal/></span>
              </a>
              <div className="project-meta"><span>{project.role}</span>{project.date && <time>{project.date}</time>}</div>
              <h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}<Arrow diagonal/></a></h3>
              <p className="project-kind">{project.kind}</p>
              <p className="project-description">{project.text}</p>
              {project.stack.length > 0 && <ul className="tags" aria-label={`${project.name} technologies`}>{project.stack.map(s => <li key={s}>{s}</li>)}</ul>}
            </article>
          ))}
        </div>
        <details className="app-gallery"><summary>Explore the four Tempat Gosip screens <span aria-hidden="true">+</span></summary><div className="app-gallery-grid">{["Sign in", "Home feed", "Profile", "Create account"].map((label, index) => <a href={`/projects/tempat-gosip-${index + 1}.jpeg`} key={label} target="_blank" rel="noopener noreferrer"><Image src={`/projects/tempat-gosip-${index + 1}.jpeg`} alt={`Original Tempat Gosip ${label.toLowerCase()} screenshot`} width={738} height={1600} sizes="(max-width: 700px) 40vw, 280px"/><span>{label}<Arrow diagonal/></span></a>)}</div></details>
        <p className="art-disclosure">Bastionfall, Chess, and Animal Quiz show actual app screenshots. Tempat Gosip combines four app screens in a styled mockup; originals are available above. Alice Store uses illustrative cover artwork.</p>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title"><div className="container about-layout"><div><h2 id="about-title">A little about<br/>my orbit<span>.</span></h2><div className="about-orbit" aria-hidden="true"><span/><i/><i/></div></div><div className="about-content"><p className="about-lead">I like understanding how things work.<br/>Then building something that works better.</p><p>I’m a Jakarta-based junior full-stack developer and a graduate of Hacktiv8’s full-stack JavaScript program. I work across web and mobile, with a particular interest in backend systems, real-time interactions, and thoughtful AI integrations.</p><p>Before writing software, I worked in procurement and supported over 400 seller accounts at Shopee. That experience taught me to listen carefully, investigate problems, and keep the people using a system at the center of the solution.</p><p>Outside of code, I’m drawn to astronomy and our solar system. There’s always something more to explore.</p><div className="skills"><div><h3>Interfaces</h3><p>React · Next.js · TypeScript<br/>React Native · Expo · Tailwind CSS</p></div><div><h3>Behind the scenes</h3><p>Node.js · Express · GraphQL · Socket.io<br/>PostgreSQL · MongoDB · REST APIs</p></div><div><h3>Quality & tools</h3><p>Jest · Supertest · Vitest · Zod<br/>Git · Postman · Vercel</p></div></div></div></div></section>
      <section className="journey-section container" aria-labelledby="journey-title"><div className="journey-intro"><h2 id="journey-title">The journey so far<span>.</span></h2><p>A different starting point.<br/>The same drive to figure things out.</p></div><div className="journey-list"><div className="journey-row"><span className="journey-date">JUL — NOV 2026</span><div><h3>Full-stack JavaScript development</h3><p>Hacktiv8 Indonesia</p><span>16 weeks of building, testing, and collaborating on full-stack applications.</span></div><span className="journey-type">Education</span></div><div className="journey-row"><span className="journey-date">APR — AUG 2024</span><div><h3>Procurement Staff</h3><p>Panca Nekasa</p><span>Material planning, supplier analysis, and procurement tracking.</span></div><span className="journey-type">Experience</span></div><div className="journey-row"><span className="journey-date">MAY — AUG 2022</span><div><h3>Business Development · Long Tail Analyst</h3><p>Shopee Indonesia</p><span>Technical and operational support for 400+ seller accounts.</span></div><span className="journey-type">Experience</span></div><div className="journey-row"><span className="journey-date">2017 — 2021</span><div><h3>Bachelor of International Relation</h3><p>UPN Veteran Jakarta · GPA 3.79</p><span>International Economics and World Politics.</span></div><span className="journey-type">Education</span></div></div></section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container"><div className="contact-top"><h2 id="contact-title">Let’s build<br/>something stellar<span>.</span></h2><div><p>Have a developer role in mind?<br/>I’d love to hear about your team.</p><a className="button button-light" href="mailto:otnielrahadiyan@gmail.com">Get in touch <Arrow diagonal/></a></div></div><div className="contact-bottom"><a className="email-link" href="mailto:otnielrahadiyan@gmail.com">otnielrahadiyan@gmail.com <Arrow diagonal/></a><a href="https://www.linkedin.com/in/otnielrahadiyan" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal/></a><a href="/otniel-resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <Arrow diagonal/></a></div></div></section>
    </main><footer className="container site-footer"><span>© {new Date().getFullYear()} Otniel Rahadiyan Sumantri</span><span>Built with curiosity. Grounded on Earth.</span><a href="#">Back to top <Arrow/></a></footer>
  </>;
}
