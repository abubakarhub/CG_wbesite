"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/content/site";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [type, setType] = useState<string>(contact.projectTypes[0]);

  return (
    <div className="relative rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_-40px_rgba(18,21,26,0.35)] md:p-10">
      <p className="mb-8 flex items-center gap-2 rounded-xl border border-dashed border-warn/60 bg-brass/10 px-4 py-3 text-sm text-ink">
        <Info className="size-4 shrink-0 text-brass-deep" aria-hidden />
        {contact.demoNote}
      </p>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
            role="status"
          >
            <CheckCircle2 className="mx-auto size-16 text-ok" aria-hidden />
            <h2 className="mt-6 font-serif text-4xl text-ink">{contact.successTitle}</h2>
            <p className="mx-auto mt-3 max-w-md text-lg text-slate-ink">{contact.successBody}</p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-8 rounded-full border border-ink/25 px-6 py-3 font-medium text-ink hover:bg-sand"
            >
              Fill it in again
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-7"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <fieldset>
              <legend className="text-lg font-semibold text-ink">1. What do you want to build?</legend>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {contact.projectTypes.map((t) => (
                  <label
                    key={t}
                    className={cn(
                      "flex min-h-14 cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-base font-medium transition-all has-focus-visible:ring-3 has-focus-visible:ring-brass",
                      type === t ? "border-ink bg-ink text-bone" : "border-border bg-bone text-ink hover:border-ink/40",
                    )}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={type === t}
                      onChange={() => setType(t)}
                      className="sr-only"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-2">
              <Label htmlFor="name" className="text-lg font-semibold text-ink">
                2. Your name
              </Label>
              <Input id="name" name="name" required autoComplete="name" className="h-14 rounded-xl bg-bone px-4 text-lg" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-lg font-semibold text-ink">
                  3. Phone
                </Label>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-14 rounded-xl bg-bone px-4 text-lg" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg font-semibold text-ink">
                  Email
                </Label>
                <Input id="email" name="email" type="email" required autoComplete="email" className="h-14 rounded-xl bg-bone px-4 text-lg" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="details" className="text-lg font-semibold text-ink">
                4. Tell us a little about it
              </Label>
              <Textarea
                id="details"
                name="details"
                rows={4}
                placeholder="Where is it, and what do you have in mind?"
                className="rounded-xl bg-bone px-4 py-3 text-lg"
              />
            </div>

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-lg font-semibold text-bone transition-colors hover:bg-ink-2"
            >
              Send (demo)
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
