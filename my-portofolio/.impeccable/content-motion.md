# Reference-led content motion

Local animation extension, Experience mode. Preserve astronomy identity, all content, route-aware header positioning, and the no-scroll Projects pager. User requested the motion from https://ajinotokusumo.vercel.app/projects after committing the existing work. Baseline commit: 8b8a0b8.

## Direction contract

THESIS: Content enters as a calm arrival; project changes preserve continuity through a short exit followed by a gentler entrance. Avoid late observer-driven fade-outs and stacked transitions.

OWN-WORLD: Existing theme, type, spacing, planetary navigation and intentional stepped pixel artwork remain unchanged. Main content motion uses opacity and a smaller 12px translation.

STORY: Navigation stays usable while the selected page arrives. The visitor can browse sections and project pages with brief feedback, without a loading gate or scrolling carousel.

FIRST VIEWPORT: CSS owns first-paint entrances, from .35 opacity and 12px to the resting state over 900ms with exponential ease-out. Visible groups are not faded out again by the observer. Navigation enters from -8px over 600ms with a 60ms stagger. Projects exit for 180ms and enter for 720ms; controls stay stationary. Reduced motion disables spatial movement and immediately settles pending selections.

FORM: Precisely requested reference-led refinement. The reference's delivered ClientPageWrapper defines opacity 0/y20 to opacity1/y0, duration .5, easeInOut. Its navigation uses 100ms sibling stagger, .5-second easeOut and y-20. Browser/native-pipe access was unavailable; matching is source-based, not frame-certified. No reference implementation code is copied into the shipped app.

FINISH: Source review, build/lint and motion lifecycle checks; record visual verification limits. No new dependencies or image assets. Animation changes remain uncommitted.

## Scroll-reveal behavior

The next user request makes content reveal on scroll. With animation APIs available, fully offscreen groups wait at zero opacity until entering the viewport, then fade and rise 18px over 1100ms. Reveals replay after the group is fully left and revisited; partial intersection changes do not hide content. The same observer handles viewport and ancestor-clipped scrolling, including individual Skills environments inside the catalogue. A mutation observer registers replacement content and prunes removed targets. Keyboard focus reveals a group immediately; focused content is never armed for hiding. Reduced motion and missing animation support keep content visible. Cleanup cancels animation effects. Pending visibility uses Web Animations effects without adding or removing React-owned HTML attributes, preventing selective-hydration mismatches. The independent source review found no material issues; live browser scrolling remains unverified because the native pipe is unavailable.

## Smoothness refinement evidence

The user's follow-up requested smoother animation. `use-project-motion.ts` preserves the computed opacity/transform when an entrance is interrupted, keeps the latest rapid-click destination, and settles pending choices when resizing changes page grouping. Both index-changing and same-index viewport regrouping are covered, along with unmount cleanup and reduced-motion cancellation. The independent source review found the resize race resolved. Section navigation retains interruption/focus/history behavior and uses a quintic easing curve with distance-aware duration. Skills and career details receive bounded feedback; the career live region remains mounted. No frame-rate or live visual certification is claimed: browser native-pipe access remains unavailable.

## Hydration fix and longer timing

The reported hydration diff showed pending reveal attributes inserted before descendants hydrated. The hook now stores visibility in browser animation effects and never writes HTML attributes. A regression fixture freezes dataset and rejects attribute mutations through entry, replay, preference changes, and cleanup. Scroll reveals last 1100ms, CSS entrances 900ms, and project transitions use a 180ms exit plus 720ms entrance. Lint, production build, and all 37 regression tests pass. Live hydration verification remains unavailable because browser native-pipe access is unavailable.
