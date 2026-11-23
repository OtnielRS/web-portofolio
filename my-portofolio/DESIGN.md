---
name: Otniel Rahadiyan Sumantri Portfolio
description: An ivory, ink and solar-orange developer portfolio with a day/night pixel workspace.
colors:
  background: "#f5f3eb"
  foreground: "#182534"
  accent: "#bc4925"
  muted: "#58626b"
  line: "#c8cbc6"
  surface-soft: "#edeade"
  surface-alt: "#eae9df"
  text-secondary: "#475461"
  text-body: "#4d5a61"
  on-accent: "#fff"
  accent-hover: "#9d391b"
  contact-ground: "#182a31"
  selection: "#e9b89c"
  dark-background: "#131d29"
  dark-foreground: "#e5e9e8"
  dark-accent: "#efb18a"
  dark-muted: "#aab8c4"
  dark-line: "#3b4c5c"
  dark-surface-soft: "#263440"
  dark-surface-alt: "#1c2a38"
  dark-text-secondary: "#bbc7ce"
  dark-text-body: "#b7c5cf"
  dark-on-accent: "#182534"
  dark-accent-hover: "#f6c7a8"
  dark-contact-ground: "#0d1722"
  dark-selection: "#644a3c"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(38px, 4.6vw, 66px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "37px"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "25px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "17px"
    lineHeight: 1.75
  body-about:
    fontFamily: "Geist, sans-serif"
    fontSize: "14px"
    lineHeight: 1.85
  body-project:
    fontFamily: "Geist, sans-serif"
    fontSize: "13px"
    lineHeight: 1.8
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  tag: "4px"
  button: "5px"
  scene-control: "6px"
  project: "10px"
  scene: "12px"
  gallery: "14px"
  pill: "999px"
spacing:
  tag-gap: "7px"
  section-heading: "30px"
  project-column: "34px"
  project-row: "52px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "13px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    textColor: "{colors.foreground}"
    rounded: "{rounded.button}"
    padding: "13px 20px"
  navigation:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "4px 18px"
  tag:
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.tag}"
    padding: "5px 8px"
---

# Design System: Otniel Rahadiyan Sumantri Portfolio

## Overview

The approved visual direction is **Work in orbit**: spacious developer work, warm paper surfaces, ink typography and solar accents. The current hero expresses that world through a cozy, animated pixel programmer workspace, with sun by day and moon and stars by night. Astronomy also remains in smaller orbital details.

This record describes the implementation in `app/globals.css`, `app/theme.css`, shared header and theme components, and the home scene. It adds no new visual direction.

## Colors

**The Semantic Theme Rule.** Use the background, foreground, accent, muted, line and surface roles above. Dark-prefixed entries are the corresponding values when the root carries `data-theme="dark"`; their unprefixed CSS variables change together. Accent supplies highlighted words, links and active navigation. Lines divide sections and outline controls; alternate surfaces distinguish About and hover states.

Light is the default. Both theme switches affect all routes; explicit preference persists as `portfolio-theme`, with an early bootstrap before hydration and a usable session fallback when storage fails. The Contact panel keeps its own dark ground in both themes. Original project screenshots retain their real colors. The pixel room has a local day/night material palette in `programmer-scene.css`; these illustration colors are not general UI roles.

## Typography

Geist is the visible sans-serif throughout. Geist Mono is loaded but is not an established display or body role. Large headings have tight tracking, while paragraphs use generous leading. The frontmatter captures the reused desktop roles; About headings grow to (47px), its lead uses (23px), and the Contact invitation reaches (60px). Navigation uses (18px), weight (550), and tracking (.06em). Small metadata, tags and scene captions use (9–12px); they are supporting content, not a scale for main prose.

**The Readable Work Rule.** Project descriptions stay at (13px), with line-height (1.8) and a maximum of (65ch); About prose stays within (70ch).

## Layout

The centered container has a maximum width of (1320px), with (96px) total desktop side clearance. The hero uses two columns (1.13fr / 1fr), projects use two equal columns, and About and Journey use asymmetric columns. Section spacing is roomy: Work ends with (85px), About uses (82px) block padding, and Journey uses (85px).

At (1100px) and below, container clearance becomes (64px), the hero columns become (1.2fr / 1fr), its heading becomes (4.7vw), and paragraph text becomes (14px). At (700px) and below, clearance becomes (40px), hero/projects/About/Journey stack, and section padding contracts toward (45–48px). The hero heading becomes `clamp(29px, 7.7vw, 52px)` and wraps. The illustration follows the copy with a (32px) top margin. The phone gallery changes from four columns to two.

Sticky navigation has a maximum width of (1000px), with scroll offsets of (128px) desktop and (110px) mobile. At (400px), header spacing and navigation labels compress again. These responsive rules are source evidence; supplied visual review covers desktop light/dark and a (595px) dark viewport, not an exact (390px) viewport.

## Elevation & Depth

**The Flat Surface Rule.** The implemented UI uses tonal fields, thin borders and image clipping rather than box shadows. The sticky navigation is a solid pill on a transparent header. Pixel room depth comes from layered rect/path shapes and nighttime lamp light.

## Shapes

Rectangular content uses modest rounded corners: tags, buttons, project imagery and the scene follow the frontmatter radii. Navigation is fully pill-shaped; theme controls and image-open affordances are circular. Borders are generally (1px). Pixel art deliberately uses crisp, stepped SVG geometry rather than smoothing its internal corners.

## Components

- **Actions:** Primary actions use accent/on-accent, secondary actions use a line border and soft hover surface. Desktop buttons have a minimum height of (49px); mobile buttons use (47px). Background and color state changes take (.2s).
- **Navigation:** Four dedicated route links remain visible in a sticky pill. Accent follows the visible homepage section or the current dedicated route; `aria-current` exposes the state. The compact theme switch is (44px), becoming (38px) below (700px) and (36px) below (400px).
- **Project cards:** Image-led, flat cards have no enclosing panel. Actual screenshots use containment at aspect ratio (1.86). Image hover scales to (1.025) over (.6s); a circular open affordance appears on hover/focus and remains visible on mobile. Technology tags wrap below descriptions. The social-app gallery uses native expandable details.
- **Programmer scene:** A responsive SVG uses a (320 × 224) viewBox, `crispEdges`, accessible title/description, and local day/night material variables. Stepped animations cover typing (.45s), breathing (4s), clouds (12s), cursor (1.3s), steam (3s) and stars (4s). Pause is a pressed-state button; animation also pauses offscreen and when the document is hidden. Reduced motion disables animation and hides the pause button. Both theme switches expose a named switch with `aria-checked`.
- **Keyboard access:** A skip link targets main content. Links and buttons receive accent focus outlines, generally (3px) with (6px) offset; navigation and the compact switch use their own (2px) outlines. Reduced motion also removes smooth scrolling and state transitions. Theme surface changes otherwise transition over (.25s).

## Do's and Don'ts

- **Do** extend semantic theme variables to new UI and retain the shared pill navigation.
- **Do** preserve supplied screenshots and the crisp SVG pixel treatment of the workspace.
- **Do** keep theme state and scene motion controls consistent across both switches.
- **Don't** present generated imagery as an actual project screenshot.
- **Don't** infer a monospace typography system from the loaded font or promote local illustration colors into UI tokens.
