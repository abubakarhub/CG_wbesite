import type { ReactNode } from "react";
import { ChatWidget } from "@/components/site/chat";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
