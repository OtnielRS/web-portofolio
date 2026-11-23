import { pageMetadata } from "@/app/_lib/metadata";
import ContactSection from "../_features/contact/contact-section";

export const metadata = pageMetadata("Contact · Otniel Rahadiyan Sumantri", "Contact Otniel about software developer opportunities, connect on LinkedIn, or view his resume.", "/contact");

export default function ContactPage() {
  return <div className="screen-flow"><ContactSection standalone /></div>;
}
