import Image, { type StaticImageData } from "next/image";
import chessSignIn from "@/public/projects/hacktiv-chess/sign-in.png";
import chessLobby from "@/public/projects/hacktiv-chess/lobby.png";
import chessMatch from "@/public/projects/hacktiv-chess/stockfish-match.png";
import chessAnalysis from "@/public/projects/hacktiv-chess/analysis.png";
import chessProfile from "@/public/projects/hacktiv-chess/profile.png";
import chessBoard from "@/public/projects/hacktiv-chess/board-settings.png";
import ScreenshotCarousel from "./screenshot-carousel";
import feed from "@/public/projects/tempat-gosip-2.jpeg";
import profile from "@/public/projects/tempat-gosip-3.jpeg";
import signIn from "@/public/projects/tempat-gosip-1.jpeg";
import registration from "@/public/projects/tempat-gosip-4.jpeg";
import bastionWelcome from "@/public/projects/bastionfall/welcome.png";
import bastionLogin from "@/public/projects/bastionfall/login.png";
import bastionSavedGame from "@/public/projects/bastionfall/saved-game.png";
import bastionCampaign from "@/public/projects/bastionfall/campaign.png";
import storeHome from "@/public/projects/alice-store/storefront.png";
import storeSignIn from "@/public/projects/alice-store/sign-in.png";
import storePromotions from "@/public/projects/alice-store/promotions.png";
import storeCatalog from "@/public/projects/alice-store/catalog.png";
import storeDetails from "@/public/projects/alice-store/product-details.png";
import storeWishlist from "@/public/projects/alice-store/wishlist.png";
import animalHome from "@/public/projects/animal-quiz/homepage.png";
import animalLogin from "@/public/projects/animal-quiz/parent-login.png";
import animalDashboard from "@/public/projects/animal-quiz/parent-dashboard.png";
import animalQuestion from "@/public/projects/animal-quiz/quiz-question.png";
import animalResults from "@/public/projects/animal-quiz/quiz-results.png";

type Screenshot = { src: StaticImageData; title: string; caption: string; mobile?: boolean };

const screenshots: Record<string, Screenshot[]> = {
  chess: [
    { src: chessSignIn, title: "Sign in", caption: "The account sign-in screen welcomes returning players." },
    { src: chessLobby, title: "Chess lobby", caption: "Choose multiplayer matchmaking, ranked play, Stockfish, or tactical puzzles." },
    { src: chessMatch, title: "Stockfish match", caption: "Play against Stockfish with a live clock and move timeline." },
    { src: chessAnalysis, title: "Post-game analysis", caption: "Review the game move by move with evaluations and move-quality summaries." },
    { src: chessProfile, title: "Profile settings", caption: "View player statistics and manage account details." },
    { src: chessBoard, title: "Board & pieces", caption: "Customize board colors, pieces, and the game background." },
  ],
  social: [
    { src: feed, title: "Home feed", caption: "Browse posts, likes, and comments in the mobile feed.", mobile: true },
    { src: profile, title: "Profile", caption: "View account information, following, and followers.", mobile: true },
    { src: signIn, title: "Sign in", caption: "The sign-in screen for existing accounts.", mobile: true },
    { src: registration, title: "Create account", caption: "The registration form for new accounts.", mobile: true },
  ],
  bastion: [
    { src: bastionWelcome, title: "Welcome", caption: "The opening screen introduces the 100-day city-defense campaign." },
    { src: bastionLogin, title: "Log in", caption: "Sign in to access a campaign or create a new account." },
    { src: bastionSavedGame, title: "Saved campaign", caption: "Continue a saved run, check its progress, or start a new game." },
    { src: bastionCampaign, title: "Campaign gameplay", caption: "Manage city upgrades, recruit soldiers, and prepare for the next monster wave." },
  ],
  store: [
    { src: storeHome, title: "Storefront", caption: "Explore featured laptop categories from the store homepage." },
    { src: storeSignIn, title: "Sign in", caption: "Access an account to continue shopping and manage a wishlist." },
    { src: storePromotions, title: "Featured laptops", caption: "Browse highlighted laptops with product summaries and prices." },
    { src: storeCatalog, title: "Product catalog", caption: "Search the laptop catalog and filter by category and price." },
    { src: storeDetails, title: "Product details", caption: "View product images, pricing, and specifications before adding a laptop to the wishlist." },
    { src: storeWishlist, title: "Wishlist", caption: "The empty wishlist guides shoppers back to the catalog to save their first laptop." },
  ],
  animal: [
    { src: animalHome, title: "Learning homepage", caption: "The homepage invites children to discover animals through learning cards and quizzes." },
    { src: animalLogin, title: "Parent login", caption: "Parents can sign in with email and password or continue with Google." },
    { src: animalDashboard, title: "Parent dashboard", caption: "The dashboard guides parents to add a child profile before starting a quiz." },
    { src: animalQuestion, title: "Animal quiz", caption: "Children answer animal questions with four choices and a visible progress tracker." },
    { src: animalResults, title: "Quiz results", caption: "The results screen celebrates the score, shares an animal fact, and reviews the answers." },
  ],
};

export default function ProjectScreenshots({ art, name }: { art: string; name: string }) {
  const screens = screenshots[art] ?? [];
  if (!screens.length) return null;
  const carousel = art === "chess" || art === "bastion" || art === "store" || art === "animal";

  return (
    <section className="project-feature-screens" aria-labelledby="project-screens-title">
      <h2 id="project-screens-title">Inside the app</h2>
      <p>{carousel ? `Browse ${screens.length} screens from ${name}. Select the main image to view the original.` : "Explore the interface without signing in. Select a screenshot to view the original image."}</p>
      {carousel ? <ScreenshotCarousel screens={screens} name={name} /> : <div className={`project-feature-grid${screens[0].mobile ? " project-feature-grid-mobile" : ""}`}>
        {screens.map(screen => (
          <figure key={screen.src.src}>
            <a href={screen.src.src} target="_blank" rel="noopener noreferrer" aria-label={`View original ${name} ${screen.title.toLowerCase()} screenshot (opens in a new tab)`}>
              <Image src={screen.src} alt={`${name}: ${screen.title}`} sizes={screen.mobile ? "(max-width: 700px) 80vw, (max-width: 1100px) 42vw, 280px" : "(max-width: 700px) 90vw, 1100px"} />
            </a>
            <figcaption><h3>{screen.title}</h3><p>{screen.caption}</p></figcaption>
          </figure>
        ))}
      </div>}
    </section>
  );
}
