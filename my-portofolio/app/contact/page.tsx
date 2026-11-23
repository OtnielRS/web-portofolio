import type { Metadata } from "next";
import ContactSection from "../_features/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact · Otniel Rahadiyan Sumantri",
  description: "Contact Otniel about software developer opportunities, connect on LinkedIn, or view his resume.",
};

export default function ContactPage() {
  return <div className="contact-page"><ContactSection standalone /></div>;
}
