import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";
import InitialLoader from "@/components/InitialLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://mahiman-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Mahiman Bhatt | Frontend & Flutter Developer",
    template: "%s | Mahiman Bhatt",
  },

  description:
    "Mahiman Bhatt is a frontend and Flutter developer in Ahmedabad, India. Explore web development and mobile app projects built with React, Next.js, and Flutter.",

  applicationName: "Mahiman Bhatt Portfolio",
  authors: [{ name: "Mahiman Bhatt" }],
  creator: "Mahiman Bhatt",
  publisher: "Mahiman Bhatt",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Mahiman Bhatt Portfolio",
    title: "Mahiman Bhatt | Frontend & Flutter Developer",
    description:
      "Explore my web development and mobile app projects built with React, Next.js, and Flutter.",
    images: [
      {
        url: "/images/og-image.png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mahiman Bhatt | Frontend & Flutter Developer",
    description:
      "Explore my web development and mobile app projects built with React, Next.js, and Flutter.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahiman Bhatt",
  url: siteUrl,
  image: `${siteUrl}/images/MB.webp`,
  jobTitle: "Frontend Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: ["https://github.com/https-mahiman"],
  knowsAbout: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Flutter",
    "Dart",
    "Node.js",
    "MongoDB",
    "Web Development",
    "Mobile App Development",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mahiman Bhatt Portfolio",
  url: siteUrl,
  description:
    "Personal portfolio of Mahiman Bhatt, frontend and Flutter developer.",
  author: {
    "@type": "Person",
    name: "Mahiman Bhatt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [personSchema, websiteSchema];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CursorGlow />
          <InitialLoader>{children}</InitialLoader>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
