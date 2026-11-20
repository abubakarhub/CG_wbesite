import Link from "next/link";
import { company, demoNav, footer, nav } from "@/content/site";
import { Logo } from "./header";
import { Ph } from "./ph";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white/80">
      <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-lg text-white/75">{footer.blurb}</p>
          <p className="mt-2 text-sm text-white/60">
            <Ph text={company.tagline} />
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Pages</h2>
          <ul className="mt-4 grid gap-2.5">
            {[...nav, ...demoNav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noopener noreferrer" : undefined}
                  className={
                    item.newTab
                      ? "inline-flex min-h-12 items-center text-white/80 transition-colors hover:text-white"
                      : "text-white/80 transition-colors hover:text-white"
                  }
                >
                  {item.label}
                  {item.newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Contact</h2>
          <address className="mt-4 grid gap-2.5 not-italic">
            <span>{company.legalName}</span>
            <span>{company.address.full}</span>
            <span className="text-sm text-white/60">
              Service area: <Ph text={company.serviceArea} />
            </span>
            <span>
              <Ph text={company.phone} />
            </span>
            <span>
              <Ph text={company.email} />
            </span>
            <span className="mt-2 text-sm text-white/60">
              License <Ph text={company.licenseNumber} />
            </span>
          </address>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-white/55 md:px-8">{footer.legal}</p>
      </div>
    </footer>
  );
}
