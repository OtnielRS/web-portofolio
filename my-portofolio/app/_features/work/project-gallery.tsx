import Image from "next/image";
import Arrow from "@/app/_components/arrow";

const screens = ["Sign in", "Home feed", "Profile", "Create account"];

export default function ProjectGallery() {
  return (
    <details className="app-gallery">
      <summary>Explore the four Tempat Gosip screens <span aria-hidden="true">+</span></summary>
      <div className="app-gallery-grid">
        {screens.map((label, index) => (
          <a href={`/projects/tempat-gosip-${index + 1}.jpeg`} key={label} target="_blank" rel="noopener noreferrer">
            <Image
              src={`/projects/tempat-gosip-${index + 1}.jpeg`}
              alt={`Original Tempat Gosip ${label.toLowerCase()} screenshot`}
              width={738}
              height={1599}
              sizes="(max-width: 700px) 40vw, 280px"
            />
            <span>{label}<Arrow diagonal /></span>
          </a>
        ))}
      </div>
    </details>
  );
}
