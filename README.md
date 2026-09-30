# NEXUX

NEXUX is a Vite + React website built for a digital brand and creative agency experience. The app includes marketing-style pages for services, work, about, contact, and insight articles, with navigation powered by React Router.

## Project root folder

The project root is the folder where `package.json` is located:

`C:\Users\jjbaah\Desktop\NEXUX\nexux`

## Tech stack

- React 19
- Vite
- React Router
- JavaScript
- ESLint
- CSS for styling

## Getting started

1. Open the project folder:
   `cd "C:\Users\jjbaah\Desktop\NEXUX\nexux"`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
4. Build for production:
   `npm run build`
5. Preview the production build:
   `npm run preview`

## Project structure

```text
nexux/
├── public/
│   ├── _redirects
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   ├── components/
│   │   ├── footer.jsx
│   │   ├── navbar.jsx
│   │   └── scrolltop.jsx
│   ├── content/
│   │   └── articles.js
│   └── pages/
│       ├── about.jsx
│       ├── contact.jsx
│       ├── home.jsx
│       ├── insight.jsx
│       ├── insightarticle.jsx
│       ├── services.jsx
│       └── work.jsx
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── public/
```

## App overview

This project is structured as a multi-page marketing website with reusable UI components and content-driven pages. The routing setup in `src/App.jsx` includes pages for:

- Home
- Services
- About
- Work
- Contact
- Insight
- Insight article detail pages

## Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Notes

This project uses a Vite-based React setup and is ready for local development and deployment. If you want, this README can also be expanded with deployment instructions, environment variables, and a more detailed project summary.

