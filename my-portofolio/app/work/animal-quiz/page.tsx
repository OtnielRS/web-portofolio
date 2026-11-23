import { pageMetadata } from "@/app/_lib/metadata";
import ProjectDetails from "../../_features/work/project-details";

export const metadata = pageMetadata("Animal Quiz · Project details · Otniel", "An animal-learning experience with learning cards, playful quizzes, and parent accounts.", "/work/animal-quiz");

export default function AnimalQuizPage() {
  return <ProjectDetails art="animal" />;
}
