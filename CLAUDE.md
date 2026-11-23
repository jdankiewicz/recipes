# Recipe repo: instructions for Claude

This repo stores the owner's recipes. Whether one has been cooked is tracked by its `cooked:` dates. Each recipe is `recipes/<slug>/index.md` (front matter + Markdown) with its images in the same folder. `templates/recipe.md` is the canonical format. The site is Jekyll, built and hosted by Netlify (https://cookrecept.netlify.app) on every push to `main`; `index.html` + `assets/search.js` do search over `search.json`.

## Ingesting a recipe (link, Instagram post, screenshot, photo, web page)

1. **Extract** title, servings, times, ingredients and method. For Instagram, use the caption, and any recipe text in the images; if the recipe is only in a video, say what is missing rather than guessing.
2. **Save the originals** in the recipe folder: the screenshot or photo as received, named `original-1.jpg`, `original-2.jpg`…, and list them under `originals:`. For a web page, keep `source_url`; also save a screenshot if the page might disappear.
3. **Convert to metric**, always:
   - **Prefer weight.** The owner weighs rather than measures by volume. Anything that can sensibly be weighed (flour, sugar, rice, oats, butter, nuts, grated cheese, chopped herbs, ginger, honey, miso…) gets grams first, even when the source gives cups, dl or spoons. Keep the volume in brackets when it helps: `250 g (4 dl) plain flour`, `185 g (1 cup) rice`.
   - Convert volumes of dry ingredients by density (e.g. 1 cup / 2.4 dl flour ≈ 125 g, sugar ≈ 200 g, butter ≈ 225 g, rice ≈ 185 g; 1 dl flour ≈ 60 g, sugar ≈ 85 g, rice ≈ 80 g). Never leave a weighable ingredient in cups or dl only.
   - Liquids in ml / l (1 cup = 240 ml, 1 fl oz = 30 ml).
   - Spoons: liquids as ml with the spoon in brackets: `15 ml (1 tbsp)`, `5 ml (1 tsp)`. Dry ingredients and pastes as grams with the spoon in brackets: `5 g (2 tsp) paprika`, `20 g (1 tbsp) honey`. Below about 1 g (a pinch, ¼ tsp cayenne) the spoon alone is fine.
   - Temperatures in °C, with fan in brackets: `200 °C (180 °C fan)`. Gas marks too, if the source used them.
   - Lengths/pan sizes in cm. Ounces/pounds to grams. Round sensibly (to 5 g / 5 ml above 20).
   - Countable items stay countable, with a weight where it helps: `1 onion (about 150 g)`.
4. **Adapt the text** to the house format: imperative steps, numbered, no story. Keep the author's credit in `source_name`.
5. **Tags:** lower case, reuse existing tags (check other recipes first). Cover course, cuisine, main ingredient, diet.
6. **Slug:** short, lower case, hyphens: `recipes/chicken-katsu-curry/`.
7. Leave `cooked: []` and `## My notes` empty unless the owner gave a date or comment.
8. **Commit straight to `main` and push**, with the message `Add <title>`, so the recipe is live on the site within a minute. No branch, no pull request. In your reply, give the live link (`https://cookrecept.netlify.app/recipes/<slug>/`) and list any conversions that were guesses.

## Updating

- "I cooked X again" → append the date to `cooked:` and a dated bullet under `## My notes`.
- Never delete the owner's notes or the original images.
