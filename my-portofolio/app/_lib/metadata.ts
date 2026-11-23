import type { Metadata } from "next";

export const site = {
  url: "https://portofolio.alicemorgan.my.id",
  name: "Otniel Rahadiyan Sumantri",
  title: "Otniel Rahadiyan Sumantri | Software Developer",
  description: "Junior full-stack developer based in Jakarta, building web, mobile, real-time, and AI-powered applications with TypeScript, React, Next.js, and Node.js.",
};

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name + " | Portfolio",
      title,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/opengraph-image", alt: site.title }],
    },
  };
}
