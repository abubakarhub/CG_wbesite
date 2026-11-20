import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Providers } from "@/components/site/providers";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "General Contractor Co. (Demo)",
    template: "%s | General Contractor Co.",
  },
  description: "Demo website for General Contractor Co., a sample builder for new homes, apartments and renovations.",
  openGraph: {
    title: "General Contractor Co. (Demo)",
    description: "Demo website for General Contractor Co., a sample builder for new homes, apartments and renovations.",
    siteName: "General Contractor Co.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} antialiased`}>
      <body className="min-h-screen bg-bone font-sans text-ink">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-bone focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
