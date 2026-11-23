# Recipes

Recipes I have actually cooked, kept as plain text so they outlive any app.

- **One folder per recipe:** `recipes/<short-name>/index.md`, with the original screenshots or photos and any dish photo saved next to it.
- **Plain Markdown with a small header** (title, tags, servings, source, dates cooked, rating). It opens in any text editor, and GitHub shows it nicely too.
- **Everything is metric:** grams, millilitres, °C, centimetres. Small spoon measures keep the spoon in brackets, e.g. `15 ml (1 tbsp)`.
- **Only cooked recipes are kept.** A new recipe arrives as a pull request; merging it means "I cooked this". Add a date to `cooked:` and a line under **My notes** each time you make it again.
- **Search:** the website (GitHub Pages) has full-text search and tag filters and works on a phone. Search links can be bookmarked, e.g. `?tag=vegetarian&q=lentil`.

## Adding photos

Every recipe page has an **Add photos** button. It opens GitHub's upload page for that recipe's folder: pick photos from your phone or computer and press "Commit changes". Any photo in the folder shows up in the recipe's gallery, and the first one is used as the main picture (set `image:` to choose a different one). Files listed under `originals:` (source screenshots) are linked rather than shown.

## Adding a recipe

Send Claude an Instagram link, a web page, or a photo of a book page or recipe card. Claude will:

1. Extract the recipe, rewrite it in the house format, and convert every quantity to metric.
2. Keep the source link and save the original screenshot or photo in the recipe's folder.
3. Open a pull request. After you cook it, add your notes and merge.

Or by hand: copy `templates/recipe.md` to `recipes/<short-name>/index.md` and fill it in.

## Why this format

Photos, Instagram saves and note apps tend to get locked in or go out of date. Markdown files in Git have no lock-in: there is a full copy on GitHub and on every computer that has cloned the repo, with the whole edit history. The website is a thin layer generated from the files, so if GitHub Pages ever goes away, the recipes are untouched.

## Previewing the site locally (optional)

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.
