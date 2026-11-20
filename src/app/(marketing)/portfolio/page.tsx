import type { Metadata } from "next";
import { OpenDashboardLink } from "@/components/site/dashboard-link";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { CtaBand, PageHero, SectionHeading } from "@/components/site/sections";
import { FeaturedProject } from "@/components/site/featured-project";
import { home, portfolio } from "@/content/site";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <>
      <PageHero {...portfolio.intro}>
        <div className="mt-8">
          <OpenDashboardLink />
        </div>
      </PageHero>
      <FeaturedProject detailed />
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow="All projects"
          title="More projects on the way."
          sub="Empty cards are ready for real photos and details."
        />
        <div className="mt-12">
          <div className="mb-8 flex flex-col items-start gap-4 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg text-ink">
              Open the sample project dashboard in a new tab. It uses demo data only.
            </p>
            <OpenDashboardLink variant="dark" />
          </div>
          <PortfolioGrid />
        </div>
      </section>
      <CtaBand {...home.finalCta} />
    </>
  );
}
