import OrbitalStudy from "./orbital-study";

export default function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="container about-layout" data-content-motion>
        <div>
          <Heading id="about-title">A little about<br />my orbit<span>.</span></Heading>
          <OrbitalStudy />
        </div>
        <div className="about-content">
          <p className="about-lead">I’m curious about how things work, and I enjoy building software that makes everyday life a little easier.</p>
          <p>
            I’m a Jakarta-based Junior Full Stack Developer building web and mobile applications with
            JavaScript and TypeScript. I work with React, Next.js, React Native, and Node.js, with a
            particular interest in backend development, AI integration, and automation to solve practical problems.
          </p>
          <p>
            My approach to development is shaped by my previous experience in procurement and supporting
            more than 400 seller accounts at Shopee. Those roles taught me to investigate operational
            issues, analyze information, and understand what people need from a system. I now bring
            that same problem-solving mindset to building software.
          </p>
          <p>Outside of code, I’m drawn to astronomy and our solar system. There’s always something more to explore.</p>
        </div>
      </div>
    </section>
  );
}
