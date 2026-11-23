# Experience surface

Mode: Experience. Audience: recruiters exploring Otniel's actual education and career. Local extension of the established astronomy portfolio; no new visual identity or factual claims. Code-led, no raster assets. Keep Home and About implementations shared. No commits or pushes requested.

## Direction contract

THESIS: Career history becomes a navigable flight path between four planets, with real milestones as destinations rather than generic stacked cards.

OWN-WORLD: Existing ivory/ink or midnight/peach theme, Geist lettering, fine orbital paths, restrained planet colors, the same shuttle language as the header.

STORY: Follow university, Shopee, procurement, and developer training in chronological order. Select a stop to read the unchanged role, organization, dates, and description.

FIRST VIEWPORT: Title and short introduction above a large orbital map at left and one readable milestone at right. Four destinations remain visible. A shuttle moves toward the selected planet; Previous/Next controls offer a second navigation path. Mobile places the map above details and permits natural internal scrolling.

FORM: A flight diagram within the incumbent section, shaped directly as a local extension; no concept-seed required. Default destination is the most recent education milestone.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Implementation evidence

This is an ordinary extension of the incumbent identity. Global `DESIGN.md` and `.impeccable/design.json` remain unchanged; this local record does not refresh their older descriptions or establish new global tokens.

- `app/_features/about/journey-section.tsx` retains the four supplied milestone records, reverses them into chronological order, and defaults to index 3 (Hacktiv8). Four native buttons expose `aria-pressed` and control the polite, atomic milestone region. Previous/Next controls disable at the chronological endpoints.
- `app/_features/about/journey-section.css` uses incumbent background, foreground, accent, muted, line and text-body variables, inherited Geist typography, fine borders and circular controls. Earth, Mars, Jupiter and Saturn materials reuse the palette in `app/_components/site-header.css`; their local gradients and inset shading are illustration treatments, not new semantic UI colors or elevation tokens.
- The desktop flight layout uses a 1.25fr/1fr map/detail split. At 700px it stacks the map above the details and removes the milestone minimum height. Shuttle movement and route reveal use local 0.7-second transitions; reduced motion removes both transitions. No raster assets were added.

## Advisory drift and verification limits

The global design record still describes the earlier Journey composition and contains a flat-surface rule; the local planet inset shading is inherited illustration treatment. Detector reports for literal planet colors and responsive type sizes are advisory: the planet palette already exists in the header, while local responsive heading sizes and supporting labels are source-level surface choices. They do not authorize changing global tokens or refreshing stale global documentation.

This documentation pass compares source behavior and incumbent tokens only. It does not certify rendered contrast, viewport fit, keyboard interaction or animation quality; those belong to the separate finish review. PRODUCT.md records the changed navigation behavior without adding professional claims.
