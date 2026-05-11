import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "ContentHub | Personalized Dashboard",
  description: "Track and interact with your favourite news, movies, and social posts in one beautiful dashboard.",
  keywords: ["content dashboard", "news", "movies", "social", "personalized feed"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: `var(--font-outfit), var(--font-inter), system-ui, sans-serif`, margin: 0, padding: 0 }}>
        <StoreProvider>
          <Layout>
            {children}
          </Layout>
        </StoreProvider>
      </body>
    </html>
  );
}
