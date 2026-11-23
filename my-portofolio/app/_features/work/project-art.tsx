import Image from "next/image";

export default function ProjectArt({ type }: { type: string }) {
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
