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

The portfolio has dedicated Home (/), Work (/work), About (/about), Skills (/skills), and Contact (/contact) routes. All five projects have a consistent Project details link beside the live demo. Routes are /work/bastionfall, /work/hacktiv-chess, /work/alice-store, /work/tempat-gosip, and /work/animal-quiz. Engineering notes use the supplied project contributions without inventing metrics, source-code links, or test results. Animal Quiz uses a feature-only overview because its implementation details and exact role have not been supplied. Tempat Gosip identifies its styled cover and offers the four original screenshots through its modal. A shared header and footer appear on every route; the logo and Home links return to /. The homepage retains its full overview. Route files compose reusable features under app/_features, while shared navigation and icons live under app/_components. Project data is maintained in app/_features/work/projects.ts.

On the homepage, navigation buttons and Explore my work smoothly scroll to their matching sections; Home returns to the actual page top. Completed section navigation resets the destination section scroll position, updates the fragment history, and focuses its heading without additional scrolling. Cancellation leaves focus and history untouched; reduced-motion navigation completes immediately. The orange highlight follows the visible section, and the journey belongs to About. Dedicated routes highlight their current page and retain normal links between pages. Reduced-motion visitors receive instant scrolling, and modified clicks retain normal browser behavior.

Each feature section occupies one viewport and uses vertical scroll snapping: Home, Work, About, Skills, Experience, Contact. The fixed transparent header floats above each screen with reserved content padding. Work uses a single-screen project pager: two compact cards on desktop and one on mobile. Previous/Next buttons replace the displayed cards rather than scrolling a track. Only the active page is rendered, with no horizontal or inner vertical scroll area. The dedicated Work route uses the same single-screen pager and adds a native project picker for direct access to all five projects. Compact cards keep details and live-demo actions visible; full descriptions and stack information belong on the project-detail routes, which use normal document flow. On short screens, previews reduce to text and actions. Work uses a bounded non-scrolling viewport, with compact previews and explicit page controls. About uses one section-level vertical scroll container. The Tempat Gosip card opens its four original screenshots in a modal on both Home and Work. Long text can scroll within its screen when necessary. The shared footer sits at the bottom of the final screen. Reduced-motion mode uses proximity snapping rather than mandatory snapping.

One-screen scrolling is enforced by a gesture controller, not only CSS snapping. A deliberate wheel gesture or vertical swipe moves to the immediately adjacent visible full-height section (Home ? Projects ? About ? Skills ? Experience ? Contact). Trackpad momentum cannot skip a screen. Scrolling over the floating header follows the same rule. Longer content and nested skills areas scroll internally until their edge; screenshot dialogs, zoom/horizontal gestures, editing controls, and document boundaries retain normal behavior. Page-navigation keys use the same transition and focus the destination heading. Reduced motion moves instantly. Pointer input, Escape, resize, route changes, or normal external navigation cancel pending motion; consumed gesture momentum does not interrupt it midway.

Inner section and skill-catalogue scrolling contain overscroll so momentum cannot chain into the document. A gesture used for reading inner content is consumed until a fresh wheel gesture or swipe begins, keeping Skills between About and Experience. Experience hides its secondary scrollbar while retaining scrolling as a fallback for short/mobile screens. Its desktop diagram, reading panel spacing, and minimum panel height scale with viewport height to reduce overflow without cutting off milestones or controls.

The View all projects link opens `/work/all`, a dedicated document-flow collection containing all five project cards, original screenshots or styled cover, full descriptions, technology tags, live demos, details links, and the Tempat Gosip screenshot modal. It is reachable from both the homepage and `/work` previews. Detail-page All projects links return to the collection; its Selected projects breadcrumb returns to `/#work` so the homepage section sequence remains scrollable. Projects remains the active header item. The collection has its own canonical and social metadata and is excluded from full-screen gesture scrolling.

## Theme and Homepage Scene

Content motion is inspired by https://ajinotokusumo.vercel.app/projects and refined for continuity: CSS handles first-paint entrances with a 12px rise and 900ms exponential ease-out, while offscreen groups wait to reveal on viewport entry with a 1100ms fade and 18px rise. Reveals can replay after a group is completely left and revisited, without resetting partially visible content. Individual Skills environments also reveal inside the catalogue scroll area. Pending visibility uses Web Animations effects without changing React-owned HTML attributes, avoiding hydration mismatches. Dynamic content is registered automatically; keyboard focus immediately reveals its group and focused content stays visible. Navigation uses a shorter 60ms stagger. Project changes have a 180ms exit before replacing cards and a 720ms entrance; interrupted animations start from their current appearance, rapid clicks use the latest requested destination, and viewport regrouping safely settles pending changes. Controls remain stationary. Skills filters and career details use brief opacity feedback. Section scrolling uses smooth acceleration and distance-aware timing capped at 1400ms. Reduced motion disables spatial effects and settles pending project choices immediately. No animation library is required, and content remains readable without animation APIs. Browser verification is unavailable; reference inspection and refinement checks are source-based.

The persistent main wrapper selects full-screen layout from the current pathname, rather than matching cached page markup. Dedicated routes use their route for active navigation; Home and About track only visible sections, ignoring hidden cached duplicates. Header height is measured for content clearance. Route changes reset stale horizontal and vertical page offsets while preserving fragment navigation.

The user requested replacing the hero solar-system illustration with a pixel-style animated programmer workspace. Light mode shows a sun and daytime room; dark mode shows a moon, stars, and night lighting. Both the header switch and the scene toggle control the entire website. The device color-scheme preference selects the initial theme before hydration and remains live while no manual preference is set. The visitor's explicit preference persists in localStorage across navigation and reloads and overrides device changes. If storage is unavailable, initial selection still follows the device and manual switching works for the current page session. Cross-tab preference updates synchronize; clearing the saved preference resumes device tracking.

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

The shared Home and About journey presents the same four education and career milestones as an interactive chronological planet flight map, replacing the list. Four planet selectors and Previous/Next controls reveal one milestone at a time, beginning with the latest, Hacktiv8 in 2026. Always-visible role labels support comparing the four stops. The selected year and visible Earlier/Later controls replace the chapter-only status. Additional label and caption spacing is reserved at narrow and intermediate widths, with natural section overflow on short viewports. The map runs from university through Shopee and procurement to developer training; the supplied roles, dates, organizations and descriptions remain unchanged. On mobile the map stacks above the details. Controls expose selection and disabled endpoints, and milestone changes are announced politely. The map follows the shared light/dark theme; reduced-motion preferences remove shuttle and route transitions.

Additional user-supplied project: Animal Quiz, an animal-learning web application shown in a supplied screenshot. Live demo: https://individual.alicemorgan.my.id/. Its exact technology stack, role and date have not been provided; omit those claims. The screenshot shows learning cards, quizzes and parent accounts.

- Panca Nekasa, Procurement Staff, April–August 2024. Weekly material planning, supplier pricing analysis, procurement tracking and records.
- Shopee Indonesia, Business Development / Long Tail Analyst, May–August 2022. Main contact for 400+ seller accounts; technical and operational troubleshooting, campaigns and performance analysis.
- Hacktiv8 Indonesia, Software Developer (Fullstack Javascript Developer), July–November 2026. Completed a 16-week program.
- University of Pembangunan Nasional Veteran Jakarta, Bachelor of International Relation, August 2017–July 2021. GPA 3.79; International Economics and World Politics concentration.

## Skills and Contact

Skills has a dedicated `/skills` route and a full-screen homepage section between About and Experience, with a matching header link. Twenty-eight technologies are grouped into Languages, Frontend, Mobile, Backend & APIs, Databases & services, AI & cloud, and Tools & testing. The compact overview shows 14 previews, two per group, with counts for additional skills. The top View all skills control reveals all 28 by default; optional environment filters narrow the catalogue and announce the result count. The expanded view uses full-width environment rows with wrapping logo/name chips inside a bounded, keyboard-accessible scroll area. The persistent top Back to overview control restores the compact view, and either view change resets the filter to All. Short viewports allow the section itself to scroll so controls and catalogue remain reachable. On mobile the overview uses one column and expanded headings stack above their chips. Logo assets are served locally from Devicon and Lobe Icons with sources and licenses recorded under public/skills. The section follows the shared light/dark theme. The user explicitly supplied Apollo, Sequelize, Git, Gemini API, OpenAI, Bootstrap, HTML, CSS, and AWS as skills; Git remains a single entry.

Resume skills also include Express.js, REST APIs, Socket.io, JWT, bcrypt, middleware, Zod, PostgreSQL, MongoDB, Supabase, Sequelize, query optimization, Redux, React Context, Tailwind CSS, React Native, Expo, Jest, Supertest, unit/integration testing, TDD, Gemini, Git, GitHub, Postman, Vite, Vercel, Agile/Scrum, pair programming, and code review. Indonesian (native), English (TOEFL ITP 540).

Contact: otnielrahadiyan@gmail.com. LinkedIn as printed: www.linkedin.com/in/otnielrahadiyan. GitHub wraps across lines in extracted PDF text and should be confirmed from the source link before publishing. The resume includes a phone number; use email as the primary public contact. Public profile and demo URLs are supplied by the resume, not independently verified live destinations.

## Brand Commitments

Astronomy and the solar system are the user's requested theme. Preserve the name from app/page.tsx: Otniel Rahadiyan Sumantri.

The header follows the user's pill-navigation reference, recolored to match the rest of the website: ivory surface, ink-blue labels, a subtle border, and solar-orange active and hover states. It stays visible at the top while scrolling and retains links to the four existing routes. Scroll offsets account for the sticky header. Header styles use scoped global CSS because the current custom Tailwind Turbopack CSS loader does not provide the expected CSS-module class exports.

## Evidence on Hand

app/page.tsx supplies the name. The user supplied C:/Users/Alice/Documents/Otniel Rahadiyan Sumantri - Resume.pdf as the reference for portfolio content. Its complete two-page text was extracted. Resume statements are user-provided evidence, not independent verification. The user subsequently provided actual Bastionfall, Hacktiv Chess, Animal Quiz and four Tempat Gosip screenshots, stored under public/projects. Tempat Gosip uses an AI-styled four-phone cover with all four original screenshots available in a modal opened from its project card. Alice Store uses a real browser screenshot of https://alice-store.alicemorgan.my.id/ captured on 2026-11-23, saved as public/projects/alice-store.jpg.

## Embedded Project Videos

The user supplied Social Media.mp4, Ecommerce.mp4, Chess.mp4, and Animal Quiz.mp4 on November 26, 2026. Their inspected content maps to Tempat Gosip, Alice Store, Hacktiv Chess Ultimate, and Animal Quiz. Copies are served under public/projects/videos. Selecting the cover image replaces it with an inline native video player, without a separate Watch demo button or modal. Posters remain until activation; controls include seeking and fullscreen. Offscreen, hidden-tab, and route cleanup pause playback, and playing one project video pauses the others. Section scrolling leaves video playback keys and fullscreen input native. The subsequently supplied bastionfall-upload.mp4 is mapped to Bastionfall with the same click-to-play behavior, completing video previews for all five projects. Browser playback could not be visually verified because the browser access host is unavailable.
