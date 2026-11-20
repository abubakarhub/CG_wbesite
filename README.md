# General Contractor Co.: website prototype

A clickable prototype website for **General Contractor Co.**, a generic sample builder. It shows what a website, a project dashboard and a personal AI assistant could look like for a general contractor.

This is a demo. It is not deployed, the contact form sends nothing, the dashboard uses example data, and the AI assistant uses scripted answers (no AI service, no API keys). Every name, address, phone number, email and project is fictional.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev -- -p 43117
```

Then open http://localhost:43117.

Other commands: `npm run build` (production build), `npm run lint`.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Cinematic hero, trust strip, sample featured project, services preview, about teaser |
| `/portfolio` | Sample case study (Linden Place) plus filterable grid of placeholder project cards |
| `/services` | Sample services list and process |
| `/about` | Story placeholder, local roots, sample values, credentials |
| `/reviews` | Empty state. No reviews are shown until real ones exist |
| `/contact` | Demo project form, sample (555) phone and example.com email, map placeholder |
| `/dashboard` | Project dashboard in its own layout (DEMO DATA). Marketing links labeled Open Project Dashboard open it in a new tab |
| `/ai` | GC AI Assistant preview. The "Ask GC AI" floating button works on the marketing pages |

## Editing content

**All copy, facts and placeholders live in one file: [`src/content/site.ts`](src/content/site.ts).**

- Anything in `[square brackets]` is a placeholder. The site highlights it automatically with a dashed amber outline. Replace the whole string, brackets included.
- The AI assistant's scripted answers are in the same file (`aiBrain.answers`). Each one carries a source label (public record, reported by the owner, open question, not known yet). Keep them to facts in that file.
- Images in `public/images/` are generated placeholders, not real projects. Each one is labeled on the site.
- The featured project is shown with a line-drawing illustration instead of a photo.
- Dashboard demo data lives in [`src/content/dashboard-data.ts`](src/content/dashboard-data.ts). Its browser saves use the `gcco-dashboard-demo-v1` localStorage prefix.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Lenis smooth scroll, lucide icons. Animations always play, even when the visitor's device has reduce motion turned on.
