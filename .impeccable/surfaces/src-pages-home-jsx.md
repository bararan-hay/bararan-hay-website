---
version: 1
slug: "src-pages-home-jsx"
primary_target: "src/pages/Home.jsx"
related_targets: ["src/App.jsx","src/components/SearchResult.jsx"]
---

# Home (search + results)

Scope: the single route of Բառարան.հայ — welcome state, live search, per-dictionary results, empty/error states. Visitor mode: Read.

Audience and job: anyone looking up an Armenian word; type, read definitions from every dictionary, search again. Content: live `/books` list and `/books/search` entries (HTML descriptions). Constraints: Armenian-only UI, neutral on orthography, `?word=` URL sync, footer credits (author, GitHub, CC BY-NC 4.0).

Memorable moment: each resolved lookup is postmarked — a circular cancellation stamp carrying the word lands on the engraved band.

## Direction contract

THESIS: The collection is one stamp issue: every dictionary is a stamp in the series with its own ink, and every lookup is postmarked. Refuses the default white page with a centered search box over grey cards.

OWN-WORLD: Cool security-paper ground (#f1f3ef), Prussian engraving blue band with generated SVG guilloche rosette and wave ribbons, microtext rule, perforated edges. One flat ink per dictionary (blue, oxblood, bottle green, ochre, violet, teal, sepia, slate), used only at edges: perforated tabs, letter-numerals, postmark. Condensed heavy Noto Sans Armenian for marks and numerals; Noto Serif Armenian for reading; definitions column stays achromatic.

STORY: The visitor sees one search panel that covers the whole collection, sees the collection as a stamp sheet, types a word, and reads each dictionary's entries in turn, knowing which dictionary said what by its ink and letter-numeral.

FIRST VIEWPORT: Blue engraved band ~330px tall, perforated bottom edge: microtext rule top, wordmark Բառարան.հայ condensed 76px top-left, guilloche rosette right, the search input as a paper denomination panel (74px, serif 28px) spanning left two thirds — primary action. Below: welcome copy left (300px), souvenir sheet of perforated stamps right, 4 across, each stamp an Armenian letter-numeral (Ա, Բ, Գ…) in its ink plus the dictionary name. With a query: postmark lands on the rosette; a sticky stamp-tab rail of matching dictionaries on the left; results column right at ~68ch.

FORM: Armenian stamp and banknote engraving (HayPost / dram intaglio), position 7 of the ordered grounded list; seed key 7c175c37. Raises: colour only at edges (cloud edge), one flat ink per dictionary (Ikeda), state as a mark — struck ՉԿԱ handstamp for no result, running perforation for loading (cutting bench).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
