# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring teams evaluating a software developer for job opportunities.

## Product Purpose

A personal software developer portfolio presenting Otniel Rahadiyan Sumantri and their work.

## Capabilities and Constraints

Existing Next.js App Router and TypeScript project. The user requested a visual mockup before implementation and approved C, Work in orbit. The supplied resume is the source of truth for professional content. Do not invent professional claims or present generated project illustrations as actual screenshots.

## Navigation and Code Organization

The portfolio has dedicated Home (/), Work (/work), About (/about), and Contact (/contact) routes. A shared header and footer appear on every route; the logo and Home links return to /. The homepage retains its full overview. Route files compose reusable features under app/_features, while shared navigation and icons live under app/_components. Project data is maintained in app/_features/work/projects.ts.

On the homepage, navigation buttons and Explore my work smoothly scroll to their matching sections; Home returns to the actual page top. The orange highlight follows the visible section, and the journey belongs to About. Dedicated routes highlight their current page and retain normal links between pages. Reduced-motion visitors receive instant scrolling, and modified clicks retain normal browser behavior.

Each feature section occupies one viewport and uses vertical scroll snapping: Home, Work, About, Experience, Contact. The fixed transparent header floats above each screen with reserved content padding. Work uses a horizontal carousel with two project cards on desktop and one on smaller screens, explicit previous/next controls, and access to all five projects. The Work route retains the original screenshot gallery. Long text can scroll within its screen when necessary. The shared footer sits at the bottom of the final screen. Reduced-motion mode uses proximity snapping rather than mandatory snapping.

## Theme and Homepage Scene

The user requested replacing the hero solar-system illustration with a pixel-style animated programmer workspace. Light mode shows a sun and daytime room; dark mode shows a moon, stars, and night lighting. Both the header switch and the scene toggle control the entire website. Light is the default, and the visitor's explicit preference persists in localStorage across navigation and reloads. If browser storage is unavailable, switching still works for the current page session.

The scene is live SVG pixel artwork with stepped typing, breathing, cloud, steam, and star animations, not a GIF. It provides a pause control, pauses when offscreen or the document is hidden, and disables nonessential motion for reduced-motion users. Existing downloadable solar-system assets remain available separately. Original project screenshots retain their real colors in either site theme.

The About orbital graphic also follows the shared theme: Earth orbits the Sun in light mode (18-second illustrative loop), while the Moon orbits Earth in dark mode (12-second loop). It provides its own pause control and pauses offscreen, in hidden tabs, and for reduced-motion preferences. Orbital sizes and speeds are illustrative.

## Professional Profile

Junior Full-stack Developer based in Jakarta. Hands-on web and mobile development with JavaScript, TypeScript, React, Next.js, and Node.js. Project work covers APIs, authentication, AI-generated game narratives, and real-time multiplayer systems. Previous experience includes supporting 400+ seller accounts at Shopee.

## Projects

- Bastionfall — Fantasy City Defense Game; Backend Developer; November 2026. Team of three. TypeScript game engine, Google Gemini narration, Zod validation and fallback handling, delayed consequences, and difficulty simulations. Stack: TypeScript, Next.js, Google Gemini API, Zod, Vite, Vitest. Resume demo: bastionfall.alicemorgan.my.id.
- Alice Store — E-Commerce Web Application; Fullstack Developer; November 2026. Laptop catalog, categories and product details, MongoDB persistence, JWT/bcryptjs authentication, and Zod validation. Stack: Next.js, React, MongoDB, Mongoloquent, JWT, bcryptjs, Zod, React Infinite Scroll Component, Toastify.js. Resume demo: alice-store.alicemorgan.my.id/.
- Tempat Gosip — Social Media Mobile App; Fullstack Developer; October 2026. Posts, likes, comments, following, GraphQL API, JWT sessions and Expo SecureStore. Stack: React Native, Expo, GraphQL, Apollo Client, Node.js, Apollo Server, MongoDB, Redis, JWT, Expo Router, SecureStore. Resume preview: https://shorturl.at/CjctA.
- Hacktiv Chess Ultimate — Classic Chess Game; Backend Developer; October 2026. Team of three, built in one week. Socket.io move/turn/timer synchronization, server-side validation, matchmaking, authentication, persistent game history, and reconnection/session recovery. Stack: JavaScript, Node.js, Vite, React Context, Tailwind CSS, Socket.io, Stockfish, JWT, bcrypt, Supabase, PostgreSQL. Resume demo: hacktive-chess.vercel.app/.

## Experience and Education

Additional user-supplied project: Animal Quiz, an animal-learning web application shown in a supplied screenshot. Live demo: https://individual.alicemorgan.my.id/. Its exact technology stack, role and date have not been provided; omit those claims. The screenshot shows learning cards, quizzes and parent accounts.

- Panca Nekasa, Procurement Staff, April–August 2024. Weekly material planning, supplier pricing analysis, procurement tracking and records.
- Shopee Indonesia, Business Development / Long Tail Analyst, May–August 2022. Main contact for 400+ seller accounts; technical and operational troubleshooting, campaigns and performance analysis.
- Hacktiv8 Indonesia, Software Developer (Fullstack Javascript Developer), July–November 2026. Completed a 16-week program.
- University of Pembangunan Nasional Veteran Jakarta, Bachelor of International Relation, August 2017–July 2021. GPA 3.79; International Economics and World Politics concentration.

## Skills and Contact

Resume skills also include Express.js, REST APIs, Socket.io, JWT, bcrypt, middleware, Zod, PostgreSQL, MongoDB, Supabase, Sequelize, query optimization, Redux, React Context, Tailwind CSS, React Native, Expo, Jest, Supertest, unit/integration testing, TDD, Gemini, Git, GitHub, Postman, Vite, Vercel, Agile/Scrum, pair programming, and code review. Indonesian (native), English (TOEFL ITP 540).

Contact: otnielrahadiyan@gmail.com. LinkedIn as printed: www.linkedin.com/in/otnielrahadiyan. GitHub wraps across lines in extracted PDF text and should be confirmed from the source link before publishing. The resume includes a phone number; use email as the primary public contact. Public profile and demo URLs are supplied by the resume, not independently verified live destinations.

## Brand Commitments

Astronomy and the solar system are the user's requested theme. Preserve the name from app/page.tsx: Otniel Rahadiyan Sumantri.

The header follows the user's pill-navigation reference, recolored to match the rest of the website: ivory surface, ink-blue labels, a subtle border, and solar-orange active and hover states. It stays visible at the top while scrolling and retains links to the four existing routes. Scroll offsets account for the sticky header. Header styles use scoped global CSS because the current custom Tailwind Turbopack CSS loader does not provide the expected CSS-module class exports.

## Evidence on Hand

app/page.tsx supplies the name. The user supplied C:/Users/Alice/Documents/Otniel Rahadiyan Sumantri - Resume.pdf as the reference for portfolio content. Its complete two-page text was extracted. Resume statements are user-provided evidence, not independent verification. The user subsequently provided actual Bastionfall, Hacktiv Chess, Animal Quiz and four Tempat Gosip screenshots, stored under public/projects. Tempat Gosip uses an AI-styled four-phone cover with all four original screenshots available in an expandable gallery. Alice Store uses a real browser screenshot of https://alice-store.alicemorgan.my.id/ captured on 2026-11-23, saved as public/projects/alice-store.jpg.
