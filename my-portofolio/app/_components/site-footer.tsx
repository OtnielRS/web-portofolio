import HomeLink from "./home-link";
import Arrow from "./arrow";

export default async function SiteFooter() {
  "use cache";

  return (
    <footer className="container site-footer">
      <span>© {new Date().getFullYear()} Otniel Rahadiyan Sumantri</span>
      <span>Built with curiosity. Grounded on Earth.</span>
      <HomeLink>Home <Arrow /></HomeLink>
    </footer>
  );
}
