import type { Metadata } from "next";
import ProjectDetails from "../../_features/work/project-details";

export const metadata: Metadata = { title: "Animal Quiz · Project details · Otniel", description: "An animal-learning experience with learning cards, playful quizzes, and parent accounts." };

export default function AnimalQuizPage() {
  return <ProjectDetails art="animal" />;
}
