# Recipe repo: instructions for Claude

This repo stores recipes the owner has actually cooked. Each recipe is `recipes/<slug>/index.md` (front matter + Markdown) with its images in the same folder. `templates/recipe.md` is the canonical format. The site is Jekyll on GitHub Pages; `index.html` + `assets/search.js` do search over `search.json`.

## Ingesting a recipe (link, Instagram post, screenshot, photo, web page)

1. **Extract** title, servings, times, ingredients and method. For Instagram, use the caption, and any recipe text in the images; if the recipe is only in a video, say what is missing rather than guessing.
2. **Save the originals** in the recipe folder: the screenshot or photo as received, named `original-1.jpg`, `original-2.jpg`…, and list them under `originals:`. For a web page, keep `source_url`; also save a screenshot if the page might disappear.
3. **Convert to metric**, always:
   - Weights in g / kg. Convert cups of dry ingredients by ingredient density (e.g. 1 cup flour ≈ 125 g, sugar ≈ 200 g, butter ≈ 225 g, rice ≈ 185 g); state grams, not cups.
   - Liquids in ml / l (1 cup = 240 ml, 1 fl oz = 30 ml).
   - Spoons: write ml with the spoon kept in brackets: `15 ml (1 tbsp)`, `5 ml (1 tsp)`. For dry spice amounts, grams with the spoon in brackets is fine: `5 g (2 tsp) paprika`.
   - Temperatures in °C, with fan in brackets: `200 °C (180 °C fan)`. Gas marks too, if the source used them.
   - Lengths/pan sizes in cm. Ounces/pounds to grams. Round sensibly (to 5 g / 5 ml above 20).
   - Countable items stay countable, with a weight where it helps: `1 onion (about 150 g)`.
4. **Adapt the text** to the house format: imperative steps, numbered, no story. Keep the author's credit in `source_name`.
5. **Tags:** lower case, reuse existing tags (check other recipes first). Cover course, cuisine, main ingredient, diet.
6. **Slug:** short, lower case, hyphens: `recipes/chicken-katsu-curry/`.
7. Leave `cooked: []` and `## My notes` empty unless the owner gave a date or comment.
8. **Open a pull request** titled `Add <title>` on a branch `recipe/<slug>`, listing any conversions that were guesses. Merging = the owner has cooked it. Never push recipes straight to `main`.

## Updating

- "I cooked X again" → append the date to `cooked:` and a dated bullet under `## My notes`.
- Never delete the owner's notes or the original images.
