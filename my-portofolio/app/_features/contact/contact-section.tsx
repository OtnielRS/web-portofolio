import Arrow from "@/app/_components/arrow";

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-top">
          <Heading id="contact-title">Let’s build<br />something stellar<span>.</span></Heading>
          <div>
            <p>Have a developer role in mind?<br />I’d love to hear about your team.</p>
            <a className="button button-light" href="mailto:otnielrahadiyan@gmail.com">
              Get in touch <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="contact-bottom">
          <a className="email-link" href="mailto:otnielrahadiyan@gmail.com">
            otnielrahadiyan@gmail.com <Arrow diagonal />
          </a>
          <a href="https://www.linkedin.com/in/otnielrahadiyan" target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
          <a href="/otniel-resume.pdf" target="_blank" rel="noopener noreferrer">
            Résumé <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}
