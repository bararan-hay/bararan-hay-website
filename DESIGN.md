---
name: Բառարան.հայ
description: Armenian dictionaries searched together, printed as one engraved stamp issue.
colors:
  blue: "#1f3f73"
  blue-deep: "#17325c"
  on-blue: "#eef0ea"
  ink-blue: "#1f3f73"
  ink-oxblood: "#8c1d2c"
  ink-green: "#24594a"
  ink-ochre: "#8a5a1c"
  ink-violet: "#4b3a78"
  ink-teal: "#1d5c6b"
  ink-sepia: "#6b4a2e"
  ink-slate: "#34404f"
  paper: "#eef0ea"
  paper-stamp: "#fafbf7"
  sheet: "#e2e6dd"
  rule: "#c9cfc4"
  ink: "#16202e"
  ink-2: "#39424f"
  ink-3: "#5a6270"
typography:
  display:
    fontFamily: "'Arm Sans', 'Noto Sans Armenian', system-ui, sans-serif"
    fontSize: "clamp(46px, 5.6vw, 80px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62.5"
  numeral:
    fontFamily: "'Arm Sans', 'Noto Sans Armenian', system-ui, sans-serif"
    fontSize: "46px"
    fontWeight: 900
    lineHeight: 0.9
    fontVariation: "'wdth' 62.5"
  headline:
    fontFamily: "'Arm Sans', 'Noto Sans Armenian', system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.1
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "'Arm Sans', 'Noto Sans Armenian', system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 650
    lineHeight: 1.2
    fontVariation: "'wdth' 82"
  search:
    fontFamily: "'Arm Serif', 'Noto Serif Armenian', Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "'Arm Serif', 'Noto Serif Armenian', Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.75
  body-intro:
    fontFamily: "'Arm Serif', 'Noto Serif Armenian', Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Arm Sans', 'Noto Sans Armenian', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.35
  microtext:
    fontFamily: "'Arm Sans', 'Noto Sans Armenian', system-ui, sans-serif"
    fontSize: "9px"
    fontWeight: 500
    letterSpacing: "0.32em"
rounded:
  none: "0px"
  hole: "50%"
spacing:
  perf: "8px"
  sm: "14px"
  md: "18px"
  lg: "24px"
  xl: "40px"
  section: "64px"
  gutter: "clamp(20px, 4.5vw, 64px)"
  wrap: "min(1312px, calc(100% - 2 * var(--gutter)))"
components:
  search-panel:
    backgroundColor: "{colors.paper-stamp}"
    textColor: "{colors.ink}"
    typography: "{typography.search}"
    rounded: "{rounded.none}"
    height: "76px"
    width: "min(100%, 860px)"
    padding: "0 24px 0 28px"
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.on-blue}"
  stamp-md:
    backgroundColor: "{colors.paper-stamp}"
    rounded: "{rounded.none}"
    padding: "4px"
    width: "46px"
    height: "56px"
  sheet-stamp:
    backgroundColor: "{colors.paper-stamp}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "7px"
    height: "188px"
  souvenir-sheet:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.none}"
    padding: "22px"
  rail-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    padding: "7px 0"
  entry:
    textColor: "{colors.ink-2}"
    typography: "{typography.body}"
    width: "46rem"
  handstamp:
    textColor: "{colors.ink-oxblood}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
    padding: "2px 26px 6px"
---

# Design System: Բառարան.հայ

## Overview

**Creative North Star: "The Stamp Issue"**

The whole collection is printed as one issue of Armenian postage, in the idiom of HayPost stamps and dram intaglio. A Prussian-blue engraved band carries the wordmark, the search panel and a generated guilloche rosette over a fine wave ribbon; below it sits cool security paper. Every dictionary is a stamp in the series, identified by an Armenian letter-numeral (Ա, Բ, Գ … ԺԵ) and one flat ink. Every resolved lookup is postmarked: a circular cancellation carrying the word, today's date and the hit count lands on the band over the rosette.

Density is calm and bookish. Colour lives at the edges (stamp frames, numerals, hairlines under dictionary headings, the postmark) while the reading column stays achromatic ink on paper. State is expressed as a printed mark rather than a hue: a struck ՉԿԱ handstamp for no result, a running row of perforation holes for loading, a ԽԱՓԱՆՈՒՄ handstamp for failure. Interface copy is Armenian only, and reformed and classical spellings get the same typographic treatment.

The world rejects the default white page with a centred search box over grey cards. Nothing is rounded, nothing floats on a soft card shadow, and nothing is decorated with icon glyphs.

**Key Characteristics:**
- Engraved Prussian-blue band with generated SVG guilloche (rosette, wave ribbon, microtext rule) and a perforated lower edge.
- Eight flat dictionary inks, assigned by collection order, used only on edges and marks.
- Condensed heavy Noto Sans Armenian for marks and numerals; Noto Serif Armenian for everything read.
- Square, perforated, framed forms; depth from framing rings and stamp masks, not elevation.
- State as a printed mark: postmark, handstamp, perforation.

## Colors

A cool paper-and-intaglio palette: one engraving blue, eight muted stamp inks, and blue-grey text inks on greenish security paper.

### Primary
- **Prussian Engraving Blue** (`blue`): the band's ground, links, focus outlines, the selection highlight, the primary button, the search hint and the loading perforation. It is the only colour allowed to fill large areas.
- **Deep Plate Blue** (`blue-deep`): hover state of the primary button only.
- **Paper on Blue** (`on-blue`): wordmark, guilloche linework, microtext and postmark ink on the band; text on the primary button.

### Secondary
The dictionary inks. Each dictionary takes `INKS[position % 8]` from its place in the `/books` list, applied through an `.ink-*` class that sets `--ink-c`.
- **Plate Blue** (`ink-blue`), **Oxblood** (`ink-oxblood`), **Bottle Green** (`ink-green`), **Ochre** (`ink-ochre`), **Violet** (`ink-violet`), **Deep Teal** (`ink-teal`), **Sepia** (`ink-sepia`), **Slate** (`ink-slate`): a dictionary's stamp frame, letter-numeral, source line and the 1px rule under its result heading. Oxblood also inks the handstamps.

### Neutral
- **Security Paper** (`paper`): page ground, and the colour punched through the band's and footer's perforated edges.
- **Stamp Paper** (`paper-stamp`): the face of every stamp and of the search panel; slightly whiter than the ground so stamps read as stuck-on paper.
- **Album Sheet** (`sheet`): the souvenir-sheet backing behind the stamp grid, the footer ground, the clear-button hover.
- **Hairline** (`rule`): 1px borders on the souvenir sheet, the welcome count divider and the missing-dictionaries divider.
- **Intaglio Black** (`ink`): headwords, titles, stamp titles, input text.
- **Second Impression** (`ink-2`): definition text, welcome and notice prose, rail links.
- **Faded Impression** (`ink-3`): sources, rail heading, the missing-dictionaries list, footer microtext.

### Named Rules
**The Edge Ink Rule.** A dictionary ink appears only on that dictionary's edges and marks: frames, numerals, source lines, the heading hairline. Definition text never takes a dictionary ink; the reading column stays `ink` / `ink-2` on paper.

**The One Ink Per Stamp Rule.** A dictionary keeps the same letter-numeral and ink everywhere it appears (welcome sheet, rail, result heading, missing list), both derived from its position in the collection. Never pick an ink by meaning or by result.

**The Marks Not Hues Rule.** States do not introduce new colours. Empty and error are struck handstamps in oxblood; loading is the blue perforation; success is the postmark in paper-on-blue.

## Typography

**Display Font:** Noto Sans Armenian, variable (self-hosted as `Arm Sans`, wdth 62.5–100, wght 100–900), fallback system-ui
**Body Font:** Noto Serif Armenian, variable (self-hosted as `Arm Serif`), fallback Georgia
**Label Font:** Arm Sans at normal width

**Character:** The sans is pushed to its narrowest, heaviest cut (wdth 62.5, wght 800–900) so marks feel engraved and denominational; the serif carries every word a visitor reads or types, at generous leading. Numbers are tabular lining throughout.

### Hierarchy
- **Display** (800, clamp 46–80px, wdth 62.5, 0.95): the Բառարան.հայ wordmark on the band; the footer repeats it at 28px in blue. 36px on phones.
- **Numeral** (900, 46px on the sheet / 26px in a medium stamp / 64px handstamp, wdth 62.5): Armenian letter-numerals and handstamp words.
- **Headline** (700, 34px, wdth 75, 1.1): the welcome title.
- **Title** (650, 24px, wdth 82, 1.2): a dictionary's name above its entries; 21px on phones.
- **Search** (serif 400, 28px; 22px on phones): the query typed into the denomination panel.
- **Body** (serif 400, 18px, 1.75; 17px on phones): definitions, measured at a 46rem column, `pre-line` so source line breaks survive. Headwords in the same size at 700.
- **Body intro** (serif 400, 17–18px, 1.7): welcome and notice prose.
- **Label** (sans 600, 14–15px): stamp titles, rail heading, counts, button text, missing-list heading.
- **Microtext** (sans 500, 9px, 0.32em tracking): the repeated Բառարան.հայ / ԱԶԱՏ ԵԼԱԿՈԴ security line on band and footer, decorative and `aria-hidden`.

### Named Rules
**The Read In Serif Rule.** Anything a visitor reads as language (definitions, prose, the query itself) is set in Noto Serif Armenian. The condensed sans is for marks, names and labels.

**The Armenian-Capable Rule.** Every weight and width used must come from the bundled Armenian variable fonts; never let Armenian fall through to a system face.

## Layout

One centred wrap (`min(1312px, 100% − 2 × gutter)`, gutter clamp 20–64px) shared by band, page and footer. The band is at least 330px tall with the wordmark and search panel top-left and the rosette pinned to the wrap's right edge; the search panel spans about two thirds of the wrap (max 860px).

The page below uses an asymmetric two-column grid with a 64px gap: a narrow sticky left column (300px welcome intro, or a 260px rail of matching dictionaries) and a wide right column (the souvenir sheet, or the 46rem results column). The souvenir sheet auto-fills stamps at a 196px minimum (four across at desktop) with 14px gaps inside a 22px album margin. Results stack one dictionary section per hit with 64px between them; dictionaries without hits collapse into a quiet grid of greyed stamps at the end.

Rhythm runs on 14 / 18 / 24 / 40 / 64px. At 960px the grids collapse to one column, sticky positioning drops, and the rail becomes a horizontally scrolling, snap-aligned strip with a fade at the right edge. At 640px the band loses its minimum height, the panel drops to 60px, the sheet is two stamps across, the postmark shrinks to a 124px seal without its wavy cancel lines, and the rosette slides partly off the right edge.

## Elevation & Depth

The system is flat paper. Depth comes from printing devices: concentric framing rings around the search panel, double frames inside stamps, perforated masks that cut stamp edges, and the band's perforated hem that punches paper-coloured holes into the blue. The one true shadow is a hairline drop under small stamps so they read as stuck on.

### Shadow Vocabulary
- **Denomination frame** (`box-shadow: 0 0 0 2px paper-stamp, 0 0 0 7px blue, 0 0 0 8px rgba(238,240,234,.5)`): the search panel at rest. On focus the outer ring thickens to a solid 2px `on-blue`.
- **Stamp lift** (`filter: drop-shadow(0 1px 1px rgba(22,32,46,.25))`): small inline stamps only.

### Named Rules
**The Printed Depth Rule.** Nothing floats. If a surface needs separation, frame it, perforate it or put it on the album sheet; never add a blurred card shadow.

## Shapes

Square corners everywhere (0px), including buttons, the clear button and the search panel. Circles appear only where print uses them: perforation holes, the postmark seal and the guilloche rosette. Stamps are rectangles whose edges are cut by a radial-gradient mask into perforations (8px pitch on sheet stamps, 6px on inline stamps, 5px on the extra-small size). Frames are 1.5px solid in the stamp's ink, with a 0.5px inner outline inset 5px on sheet stamps for a double-rule plate border.

## Components

### Buttons
Plain and square, a printed block of the engraving blue.
- **Shape:** square (0px).
- **Primary:** `blue` fill, `on-blue` text, sans 600 15px, 12px × 24px padding. Used for retry actions.
- **Hover / Focus:** fill deepens to `blue-deep` over 160ms; focus is the global 2px blue outline at 3px offset.
- **Clear (in search):** 48px square, transparent, `ink-2` X drawn as an inline SVG; hover takes `sheet` ground and blue stroke. Escape also clears.

### Search Panel (signature)
The denomination panel: a stamp-paper field inside a blue and paper ring on the engraved band, 76px tall, serif 28px input with a blue caret, `autoFocus`. When empty, a right-aligned count of dictionaries in blue; when filled, the clear button.

### Stamps (signature)
- **Sheet stamp:** perforated stamp-paper tile, 188px tall, double-ruled frame in the dictionary ink, the letter-numeral top-left at 46px, title in `ink` 15px/600 bottom-aligned, source line in the ink at 12.5px. Enters with a 6px rise staggered 30ms per stamp.
- **Inline stamp:** the same perforated object at md (46×56), sm (28×34, rail) and xs (20×24, missing list at 55% opacity), with a faint diagonal hatch behind the numeral.
- **Souvenir sheet:** the `sheet` backing with a 1px `rule` border that holds the welcome grid.

### Navigation (results rail)
A sticky list titled "Գտնվել է N բառարանում"; each row is a small stamp plus the dictionary title in `ink-2` 14px, anchoring to its result section. Hover darkens and underlines the title. Below 960px it becomes a horizontal snap strip.

### Result Section
A heading row (md stamp, title at 24px/650/wdth 82, source in `ink-3`) closed by a 1px hairline in the dictionary's ink, then entries in serif 18px/1.75: headword bold in `ink`, definition in `ink-2`, HTML rendered as delivered.

### Postmark (signature)
Fires when a lookup resolves with hits: a 220px circular seal (outer ring 3px, inner 2px) with the uppercased word and Բառարան.հայ set on a ring, the date in condensed 800, and "N բառարան", plus five wavy cancel lines. Drawn in `on-blue` through an SVG turbulence filter so the ink breaks up like a real strike, rotated −9°, landing in 520ms from a 1.3× blurred start. The rosette fades to 22% and turns 14° beneath it.

### Handstamp (state)
A struck rubber-stamp word (ՉԿԱ for no result, ԽԱՓԱՆՈՒՄ for error) in oxblood, 900 condensed, 3px border plus a 1.5px outline offset 4px, rotated −6°, striking in over 420ms. Sits above serif notice text and, for errors, a retry button.

### Perforation (loading)
A row of 18 ten-pixel rings outlined in blue that fill in sequence (60ms stagger, 1.1s alternate), announced to assistive tech through a hidden status label.

## Do's and Don'ts

### Do:
- **Do** derive a dictionary's ink and letter-numeral from its position in the collection, and reuse both everywhere that dictionary appears.
- **Do** keep definitions achromatic: serif 18px/1.75 in `ink-2`, headword in `ink`, inside a 46rem column.
- **Do** express states as printed marks (postmark, handstamp, perforation) using the existing inks.
- **Do** keep every corner square and cut stamp edges with the perforation mask rather than drawing dots.
- **Do** generate engraving (rosette, ribbon, cancel lines) as SVG paths in code and keep it `aria-hidden`.
- **Do** respect `prefers-reduced-motion`: animations and transitions collapse to 1ms.

### Don't:
- **Don't** colour definition text, headwords or the reading column with a dictionary ink.
- **Don't** introduce rounded corners, soft card shadows or grey cards on white.
- **Don't** add new state colours (green success, red banners); use a mark.
- **Don't** set read text in the condensed sans, or let any Armenian text fall back to a system font.
- **Don't** style reformed and classical spellings differently or mark one as preferred.
