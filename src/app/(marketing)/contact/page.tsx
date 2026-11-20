import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/motion";
import { Ph } from "@/components/site/ph";
import { PageHero } from "@/components/site/sections";
import { company, contact } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

const details = [
  { Icon: MapPin, label: "Office", value: company.address.full },
  { Icon: Phone, label: "Phone", value: company.phone },
  { Icon: Mail, label: "Email", value: company.email },
  { Icon: Clock, label: "Hours", value: contact.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero {...contact.intro} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <ContactForm />
        </Reveal>
        <div className="grid content-start gap-6">
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {details.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-brass-deep">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-slate-ink uppercase">{label}</p>
                    <p className="mt-1 text-lg text-ink">
                      <Ph text={value} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.5rem] border-2 border-dashed border-brass-deep/40 bg-sand">
              <div className="blueprint-grid absolute inset-0" aria-hidden />
              <div className="relative max-w-xs px-6 text-center">
                <MapPin className="mx-auto size-10 text-brass-deep" aria-hidden />
                <p className="mt-4 text-base text-slate-ink">{contact.mapNote}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-ink">
              {company.name}, {company.address.full}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
