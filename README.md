# Renuka E — Portfolio

A personal developer portfolio built with React + Vite, styled with a dark
emerald "developer" aesthetic, and animated with Framer Motion. All content
(name, summary, skills, experience, projects, education, certifications,
contact details) is taken directly from the attached resume — nothing was
invented.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build
```

## Assets you still need to add

These weren't included in the original request, so the site currently falls
back to tasteful placeholders. Drop the real files into `public/` with these
exact names and they'll be picked up automatically — no code changes needed:

| File                     | Used for                               | Current fallback                |
|---------------------------|------------------------------------------|-----------------------------------|
| `public/profile.jpg`      | Hero section profile photo               | Circular initials badge ("RE")    |
| `public/farmverse.png`    | FarmVerse project screenshot             | Icon placeholder tile             |
| `public/translator.png`   | Offline AI Voice Translator screenshot   | Icon placeholder tile             |

`public/Renuka-Resume.pdf` has already been added (it's the resume PDF you
uploaded), and the "Download Resume" button in the Hero section links to it.

## Project structure

```
src/
├── components/        # Navbar, Hero, About, Skills, Experience,
│                       Projects, Education, Certifications, Contact, Footer
├── data/resume.js      # single source of truth for all resume content
├── index.css           # design tokens + base styles
├── components.css      # component-level styles
├── App.jsx
└── main.jsx
public/
├── Renuka-Resume.pdf
├── profile.jpg          (add this)
├── farmverse.png        (add this)
└── translator.png       (add this)
```

To update any content (new project, new internship, a new skill, etc.), edit
`src/data/resume.js` — the whole site reads from that one file, so nothing
else needs to change.

## Deploying

This is a static site after `npm run build` (output in `dist/`). It deploys
as-is to Vercel, Netlify, GitHub Pages, or any static host.
