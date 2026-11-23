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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
