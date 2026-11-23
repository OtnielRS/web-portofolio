const journey = [
  {
    date: "JUL — NOV 2026",
    title: "Full-stack JavaScript development",
    organization: "Hacktiv8 Indonesia",
    description: "16 weeks of building, testing, and collaborating on full-stack applications.",
    type: "Education",
  },
  {
    date: "APR — AUG 2024",
    title: "Procurement Staff",
    organization: "Panca Nekasa",
    description: "Material planning, supplier analysis, and procurement tracking.",
    type: "Experience",
  },
  {
    date: "MAY — AUG 2022",
    title: "Business Development · Long Tail Analyst",
    organization: "Shopee Indonesia",
    description: "Technical and operational support for 400+ seller accounts.",
    type: "Experience",
  },
  {
    date: "2017 — 2021",
    title: "Bachelor of International Relation",
    organization: "UPN Veteran Jakarta · GPA 3.79",
    description: "International Economics and World Politics.",
    type: "Education",
  },
];

export default function JourneySection() {
  return (
    <section className="journey-section container" id="experience" aria-labelledby="journey-title">
      <div className="journey-intro">
        <h2 id="journey-title">The journey so far<span>.</span></h2>
        <p>A different starting point.<br />The same drive to figure things out.</p>
      </div>
      <div className="journey-list">
        {journey.map(entry => (
          <div className="journey-row" key={entry.title}>
            <span className="journey-date">{entry.date}</span>
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.organization}</p>
              <span>{entry.description}</span>
            </div>
            <span className="journey-type">{entry.type}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
