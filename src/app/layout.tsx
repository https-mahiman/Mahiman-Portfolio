import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahiman-portfolio.vercel.app"),

  title: {
    default: "Mahiman Bhatt | Full Stack Developer & Flutter Developer",
    template: "%s | Mahiman Bhatt",
  },

  description:
    "I'm Mahiman Bhatt, a Full Stack Web Developer and Flutter Developer from Ahmedabad, India. Explore my portfolio, projects, technical skills, and experience building modern web and mobile applications.",

  keywords: [
    "Mahiman Bhatt",
    "Full Stack Developer",
    "Flutter Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer Ahmedabad",
    "Mobile App Developer",
    "Freelance Developer",
    "Portfolio",
  ],

  authors: [{ name: "Mahiman Bhatt" }],
  creator: "Mahiman Bhatt",
  publisher: "Mahiman Bhatt",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Mahiman Bhatt | Full Stack & Flutter Developer",
    description:
      "Discover my projects, skills, and experience in web and mobile app development.",
    url: "https://mahiman-portfolio.vercel.app",
    siteName: "Mahiman Bhatt Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahiman Bhatt — Full Stack and Flutter Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mahiman Bhatt | Developer Portfolio",
    description:
      "Full Stack Web Developer and Flutter Developer. Explore my work and projects.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon-v2.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CursorGlow />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
