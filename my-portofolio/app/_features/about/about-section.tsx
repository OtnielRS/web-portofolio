import OrbitalStudy from "./orbital-study";

export default function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="container about-layout">
        <div>
          <Heading id="about-title">A little about<br />my orbit<span>.</span></Heading>
          <OrbitalStudy />
        </div>
        <div className="about-content">
          <p className="about-lead">I like understanding how things work.<br />Then building something that works better.</p>
          <p>
            I’m a Jakarta-based junior full-stack developer and a graduate of Hacktiv8’s full-stack
            JavaScript program. I work across web and mobile, with a particular interest in backend
            systems, real-time interactions, and thoughtful AI integrations.
          </p>
          <p>
            Before writing software, I worked in procurement and supported over 400 seller accounts
            at Shopee. That experience taught me to listen carefully, investigate problems, and keep
            the people using a system at the center of the solution.
          </p>
          <p>Outside of code, I’m drawn to astronomy and our solar system. There’s always something more to explore.</p>
          <div className="skills">
            <div>
              <h3>Interfaces</h3>
              <p>React · Next.js · TypeScript<br />React Native · Expo · Tailwind CSS</p>
            </div>
            <div>
              <h3>Behind the scenes</h3>
              <p>Node.js · Express · GraphQL · Socket.io<br />PostgreSQL · MongoDB · REST APIs</p>
            </div>
            <div>
              <h3>Quality & tools</h3>
              <p>Jest · Supertest · Vitest · Zod<br />Git · Postman · Vercel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
