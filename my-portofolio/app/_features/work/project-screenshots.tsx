import Image, { type StaticImageData } from "next/image";
import chess from "@/public/projects/hacktiv-chess.jpg";
import feed from "@/public/projects/tempat-gosip-2.jpeg";
import profile from "@/public/projects/tempat-gosip-3.jpeg";
import signIn from "@/public/projects/tempat-gosip-1.jpeg";
import registration from "@/public/projects/tempat-gosip-4.jpeg";
import bastion from "@/public/projects/bastionfall.jpg";
import store from "@/public/projects/alice-store.jpg";
import animal from "@/public/projects/animal-quiz.jpg";

type Screenshot = { src: StaticImageData; title: string; caption: string; mobile?: boolean };

const screenshots: Record<string, Screenshot[]> = {
  chess: [
    { src: chess, title: "Chess lobby", caption: "The lobby presents multiplayer matchmaking, Stockfish, and tactical puzzles." },
  ],
  social: [
    { src: feed, title: "Home feed", caption: "Browse posts, likes, and comments in the mobile feed.", mobile: true },
    { src: profile, title: "Profile", caption: "View account information, following, and followers.", mobile: true },
    { src: signIn, title: "Sign in", caption: "The sign-in screen for existing accounts.", mobile: true },
    { src: registration, title: "Create account", caption: "The registration form for new accounts.", mobile: true },
  ],
  bastion: [
    { src: bastion, title: "Campaign gameplay", caption: "The city-defense interface shows resources and an incoming Orc Host wave." },
  ],
  store: [
    { src: store, title: "Storefront", caption: "The laptop storefront with product navigation, search, and promotions." },
  ],
  animal: [
    { src: animal, title: "Learning homepage", caption: "The homepage introduces animal learning cards and the start-adventure action." },
  ],
};

export default function ProjectScreenshots({ art, name }: { art: string; name: string }) {
  const screens = screenshots[art] ?? [];
  if (!screens.length) return null;

  return (
    <section className="project-feature-screens" aria-labelledby="project-screens-title">
      <h2 id="project-screens-title">Inside the app</h2>
      <p>Explore the interface without signing in. Select a screenshot to view the original image.</p>
      <div className={`project-feature-grid${screens[0].mobile ? " project-feature-grid-mobile" : ""}`}>
        {screens.map(screen => (
          <figure key={screen.src.src}>
            <a href={screen.src.src} target="_blank" rel="noopener noreferrer" aria-label={`View original ${name} ${screen.title.toLowerCase()} screenshot (opens in a new tab)`}>
              <Image src={screen.src} alt={`${name}: ${screen.title}`} sizes={screen.mobile ? "(max-width: 700px) 80vw, (max-width: 1100px) 42vw, 280px" : "(max-width: 700px) 90vw, 1100px"} />
            </a>
            <figcaption><h3>{screen.title}</h3><p>{screen.caption}</p></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
