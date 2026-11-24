This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The portfolio has four routes: `/` (home), `/work`, `/about`, and `/contact`.

`app/page.tsx` composes the homepage overview. Shared navigation, footer, and icons live in `app/_components/`. Feature code lives in `app/_features/`:

- `home/`: introduction and animated pixel-art programmer workspace
- `work/`: project data, covers, cards, screenshot gallery, and work section
- `about/`: biography, skills, education, and experience
- `contact/`: contact section

The route files in `app/work/`, `app/about/`, and `app/contact/` reuse those features. `app/layout.tsx` renders the shared header, main landmark, and footer on every page. Edit project information in `app/_features/work/projects.ts`.

The header’s sun/moon switch and the scene’s Lights off / Lights on control share the same theme. The preference is saved in browser storage and applied before hydration. Light mode shows a sunny pixel workspace; dark mode shows a moonlit workspace. Animation pauses offscreen, in background tabs, or through the scene’s pause control, and respects reduced-motion settings.

Run `npm run test:theme` to check saved preferences, pre-hydration theme initialization, switching, and blocked-storage fallback behavior.

Homepage navigation and Explore my work animate to the matching sections with sticky-header clearance. Home scrolls to the actual top. On dedicated routes, navigation still opens the corresponding pages. Run `npm run test:navigation` to verify scrolling, reduced-motion behavior, and normal browser link handling.

`app/screen-flow.css` gives each feature section a full viewport and snaps vertical scrolling between screens. The header floats over reserved space at the top, and the footer is anchored to the final screen. The Work section uses `project-carousel.tsx` to show two cards on desktop or one on smaller screens; its arrows, horizontal scrolling, and keyboard navigation keep all projects accessible. Text-heavy sections allow internal scrolling when needed. Reduced-motion preferences soften snapping and disable animated scrolling.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Full-screen wheel and swipe navigation is handled by `app/_components/screen-scroll.ts` and `use-screen-scroll.ts`. Each gesture selects one adjacent section; momentum is suppressed until that gesture ends. Long content keeps normal inner scrolling, while reduced-motion navigation is instant. Run `node --test tests/screen-scroll.test.mjs tests/section-link.test.mjs` to check screen boundaries, gesture handling, and interruption.

`/work/all` is the full project collection, reached through View all projects on the homepage or `/work`. It shows all five projects in a responsive grid with standard document scrolling. Project detail pages return here through All projects. The homepage and `/work` keep their compact, single-screen pager.

Inner content uses overscroll containment and requires a fresh gesture after reaching its edge, preventing Skills from being skipped. Experience scales its diagram to the viewport and hides its inner scrollbar; short/mobile layouts can still scroll to reach every milestone and control.

The collection page's Selected projects link returns to `/#work` on the homepage, so visitors can continue scrolling through About, Skills, Experience, and Contact.
