import Link from "next/link";
import Arrow from "@/app/_components/arrow";
import { pageMetadata } from "@/app/_lib/metadata";
import { projects } from "@/app/_features/work/projects";
import WorkSection from "@/app/_features/work/work-section";

export const metadata = pageMetadata(
  "All projects · Otniel Rahadiyan Sumantri",
  "Browse Otniel's complete collection of web, mobile, multiplayer, and AI-powered projects, with screenshots, technology stacks, live demos, and project details.",
  "/work/all",
);

export default function AllProjectsPage() {
  return (
    <div className="page-content project-collection">
      <div className="container project-collection-top">
        <Link className="project-case-back" href="/#projects"><span className="carousel-previous"><Arrow /></span> Selected projects</Link>
        <p>{projects.length} projects · Web &amp; mobile</p>
      </div>
      <WorkSection standalone title="All projects" />
    </div>
  );
}
