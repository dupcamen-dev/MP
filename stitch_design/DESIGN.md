---
name: Kinetic Shard
colors:
  surface: '#141315'
  surface-dim: '#141315'
  surface-bright: '#3a393b'
  surface-container-lowest: '#0f0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2b292c'
  surface-container-highest: '#363436'
  on-surface: '#e6e1e4'
  on-surface-variant: '#d0c6ab'
  inverse-surface: '#e6e1e4'
  inverse-on-surface: '#313032'
  outline: '#999077'
  outline-variant: '#4d4632'
  surface-tint: '#ecc300'
  primary: '#fff3d4'
  on-primary: '#3b2f00'
  primary-container: '#ffd300'
  on-primary-container: '#705b00'
  inverse-primary: '#715c00'
  secondary: '#ffb4a8'
  on-secondary: '#690000'
  secondary-container: '#e10000'
  on-secondary-container: '#fff1ef'
  tertiary: '#f3f3f3'
  on-tertiary: '#2f3131'
  tertiary-container: '#d7d7d7'
  on-tertiary-container: '#5c5d5e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe17a'
  primary-fixed-dim: '#ecc300'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#554500'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930100'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#141315'
  on-background: '#e6e1e4'
  surface-variant: '#363436'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 70px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
  subheading:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.1em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.05em
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  shard-angle: 15deg
---

## Brand & Style

The brand personality is high-octane, disruptive, and uncompromising. It targets the "vibe coding" subculture—developers who prioritize speed, intuition, and raw impact over traditional corporate methodologies. The UI should evoke a sense of controlled chaos, combining the polished precision of high-end SaaS with the jagged, aggressive energy of street-wear branding.

The design system utilizes a **Bold / High-Contrast** aesthetic blended with **Glassmorphism**. It draws heavy inspiration from "slash" graphics—jagged, angular intersections and "broken" layouts that defy standard container constraints. This is a master class in "maximalist minimalism": huge typography and loud colors paired with vast, intentional voids of dark space.

## Colors

The palette is rooted in a deep, charcoal "Rich Black" to provide maximum contrast for the high-visibility "Vibrant Yellow." 

- **Primary (Vibrant Yellow):** Used for critical calls to action, hero typography highlights, and the most aggressive jagged accents. 
- **Accent (Deep Red):** Reserved for technical details, status indicators, and subtle "hazard" style warnings. It provides a sophisticated street-culture edge.
- **Surface (Cool Grey/White):** Used primarily for body text and secondary icons to ensure legibility against the dark background.
- **Glass Effects:** Background blurs utilize a 15% opacity version of the neutral color with a high saturation boost to pull colors from underlying shards.

## Typography

Typography is used as a structural element. **Anton** provides a cinematic, condensed authority for headers, often used in all-caps to mimic "DAN ZAN" street posters. **Geist** offers a technical, clean counter-balance for body copy, while **Space Mono** handles metadata and "vibe coding" stats to reinforce the developer-centric nature of the portfolio.

Large display text should occasionally use "cut-out" or "mask" effects, where the text is knocked out of a yellow shard to reveal the dark background beneath.

## Elevation & Depth

Hierarchy is established through **Color Saturation** and **Backdrop Blurs** rather than traditional shadows.

1.  **Level 0 (Base):** The #212022 background.
2.  **Level 1 (Shards):** Solid blocks of Primary Yellow or Secondary Red, angled and intersecting.
3.  **Level 2 (Glass Containers):** Semi-transparent (40-60% opacity) white or dark panels with `backdrop-filter: blur(20px)`. These house the interactive components and body text.
4.  **Level 3 (Interactive):** High-contrast outlines (2px solid yellow or white) used for hover states and active buttons.

No soft shadows are permitted. Use hard "block" shadows (offset 4px or 8px with 100% opacity) if depth is required for buttons.

## Shapes

The shape language is strictly **Sharp (0px roundedness)**. Every element—buttons, cards, input fields, and shards—must have crisp, 90-degree or acute-angle corners. This reinforces the "raw" and "edgy" aesthetic of the brand. Rectangles should occasionally have a corner "clipped" at a 45-degree angle to mimic the shard-inspired geometry.

## Components

### Buttons
Primary buttons are solid #ffd300 with black Anton text, all-caps. They use a "double-border" hover effect where a second yellow frame expands outward from the button. Secondary buttons are "Ghost" style with a 2px white border and no fill.

### Cards
Cards are glassmorphic panels. They feature a "bracket" detail in the corners (top-left and bottom-right) using the Accent Red. Content within cards is left-aligned with tight leading.

### Input Fields
Inputs are simple bottom-border lines (2px #efefef). When focused, the line turns #ffd300 and a subtle, semi-transparent yellow shard appears as a background highlight behind the text.

### Chips & Tags
Tags use the **Space Mono** font and are styled as "Hazard Labels." They feature small black-and-yellow diagonal "caution" stripes on the left edge.

### Layout Dividers
Instead of lines, use "The Slash." A large, screen-width SVG path that cuts diagonally across the viewport, separating content blocks with a jagged, broken-glass edge.