# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The general public, with no single dominant audience: anyone who needs to look up an Armenian word. Typical sessions are short and focused: type a word, read its definitions across dictionaries, leave or search again.

## Product Purpose

Բառարան.հայ is a free, open-source online repository of Armenian dictionaries. One search queries every dictionary in the collection at once and shows each dictionary's entries for that word. Success is getting from a typed word to a readable definition with as little friction as possible.

## Positioning

An open-source aggregator: many Armenian dictionaries searched together in one place, with the code public on GitHub and the content under a Creative Commons BY-NC 4.0 license. It is a community resource, not a commercial product.

## Operating Context

- Search is live (debounced ~300 ms) as the user types; the query is mirrored to the URL as `?word=` so lookups are linkable and survive reload.
- With an empty query, the page welcomes the visitor and lists the dictionaries in the collection.
- Results come from `POST /books/search` and are grouped per dictionary; dictionaries without hits are hidden. An empty result reads "Ընտրված բառարաններում այս բառը չկա".
- Entry descriptions arrive as HTML strings with escaped `\n` line breaks and are rendered as-is.
- An offline macOS Dictionary.app version exists (see `public/_posts/2020-04-19-macos-dictionary.md`).

## Capabilities and Constraints

- Stack: React 17, Create React App (react-scripts 4), plain CSS (antd remains a dependency but the redesigned surface no longer uses it); deployed to GitHub Pages (`gh-pages`) at https://բառարան.հայ.
- API base comes from `REACT_APP_API`; endpoints `GET /books` and `POST /books/search`.
- Dictionary content mixes reformed and classical Armenian orthography; the interface must present both neutrally and never imply one spelling is correct.
- Bundled fonts: variable Noto Sans Armenian and Noto Serif Armenian (wdth + wght axes) in `src/assets/fonts`, loaded from `src/assets/styles/index.css`. CRA 4 does not compile Less; styles are plain CSS.
- Node 17+ needs `NODE_OPTIONS=--openssl-legacy-provider` for react-scripts 4 (set in the npm scripts).

## Brand Commitments

- Name: Բառարան.հայ.
- Interface copy is Armenian only.
- Footer credits: author Տիգրան Սիմոնյան (https://tigransimonyan.com), GitHub repo link/star (https://github.com/bararan-hay/bararan-hay-website), CC BY-NC 4.0 license.
- The existing logo and palette are not binding; a full visual redesign is approved.

## Evidence on Hand

- Live dictionary list and entries from the API; no testimonials, usage numbers, or press exist and none may be invented.

## Product Principles

1. The word comes first: search is always the immediate action, and definitions are the main content.
2. Respect the text: dictionary entries are reading material and deserve real typography, not card chrome.
3. Neutral on orthography: reformed and classical spellings coexist without judgment.
4. Open by nature: open source and open license stay visible and credited.

## Accessibility & Inclusion

Armenian script must render with a proper Armenian-capable font at every weight used. No further product-specific requirement established.
