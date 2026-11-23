# Skills surface

Mode: Experience. Local layout extension of the established portfolio, preserving 28 skills, seven environments, logos, theme, routes, and full-screen navigation. User wants a friendly overview and a good complete view after View all. Code-led; no new imagery or identity.

## Direction contract

THESIS: A compact skills overview opens into a readable technology catalogue, rather than expanding seven uneven columns into a long wall of cards.

OWN-WORLD: Inherit Geist, ivory/ink and midnight/peach semantic tokens, understated borders, and locally sourced technology logos. No new global tokens.

STORY: Scan every environment with two representative technologies. Choose View all skills to reveal all28, then optionally narrow by environment. Collapse remains available at the same top position.

FIRST VIEWPORT: Heading and disclosure lead in a two-sided toolbar. Overview groups use a compact grid with honest hidden counts. Expanded rows pair category headings with wrapping logo/name chips; a filter strip and result count sit above one keyboard-focusable scroll region. On phones headings and skill rows stack with comfortable touch targets.

FORM: Directly shaped local layout refinement, no concept-seed or comp round. Browser availability may limit rendered evidence; source and interaction verification must be labeled accurately.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Implementation evidence and documentation

Source review on 2026-11-23: `app/_features/skills/skills.ts` contains seven groups and 28 technologies; `skills-section.tsx` renders two previews per group (14 total), exposes View all skills and Back to overview through one persistent top disclosure, and resets the environment to All on either view change. Expanded mode renders all entries by default, offers All plus seven environment filters with pressed states, and announces the visible count through a status region. Its labelled catalogue region is keyboard-focusable; changing filters resets its scroll position.

`skills-section.css` bounds catalogue scrolling within the full-screen flex section using a flexible region with `min-height: 0` and vertical overflow. The expanded catalogue uses full-width rows pairing an environment heading with wrapping logo/name chips; below 700px the overview becomes one column and expanded headings stack above their chips. Source review found that shared footer padding could shrink the catalogue to zero in short landscape viewports. The fallback at heights up to 600px enables outer section scrolling and gives the non-shrinking catalogue a minimum height of 180px, retaining access to the controls and skills. The toolbar sits outside the inner scroll region in normal viewports; the short-height fallback can scroll the toolbar with the section. Accent focus outlines and the reduced-motion override are present in source. These are source-level findings, not observed browser interaction results.

The existing Geist, semantic light/dark colors, flat borders, local logos, routes, and skill content remain the visual authority. This is an ordinary local extension, with no identity replacement or drift repair. Typography/radius detector advisories are limited to existing intentional local values; no global token changes are warranted. No new assets were introduced. `PRODUCT.md` now records this surface behavior; `DESIGN.md` and `.impeccable/design.json` remain unchanged.

Visual validation limit: the browser native pipe was unavailable during this pass, so rendered desktop/mobile, light/dark, keyboard scrolling, focus visibility, and clipping could not be verified in the browser. Source evidence above does not substitute for that visual validation.
