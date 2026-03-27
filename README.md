# Simple Language Stats

Enjoy simplicity. A GitHub Action that automatically generates and updates language statistics in your README profile.

<!-- simple-lang-stats -->
```
37.98% ==    JavaScript
24.99% =     Fluent
13.78% =     TypeScript
 7.39% =     Python
 6.38% =     TeX
 3.64% =     CSS
 1.47% =     BibTeX Style
  1.4% =     MDX
 1.23% =     Astro
  0.8% =     HTML
 0.32% =     Swift
 0.26% =     Julia
 0.14% =     Shell
 0.07% =     Typst
 0.06% =     XSLT
 0.04% =     Ruby
 0.03% =     PowerShell
 0.01% =     Perl
 0.01% =     Batchfile
```
*Based on 16 non-forked repositories for Carolyn Sun (carolyn-sun)<br/>Powered by [carolyn-sun/simple-lang-stats](https://github.com/carolyn-sun/simple-lang-stats)*
<!-- /simple-lang-stats -->

## Usage

Set a `PAT` secret in your repository settings in case you reach the API rate limit. `Repo` scope is sufficient.

Add this marker to your README.md where you want the language statistics to appear:

```markdown
<!-- simple-lang-stats -->
<!-- /simple-lang-stats -->
```

The action will automatically insert your language statistics between these markers.

Then, add it to your workflow file (e.g., `.github/workflows/update-stats.yml`):

```yaml
name: Update language stats

on:
  push:
  schedule:
    - cron: '0 */48 * * *'  # Run every 48 hours
  workflow_dispatch:  # Allow manual trigger

jobs:
  update-stats:
    runs-on: ubuntu-latest
    permissions:
      contents: write  # Allow writing to repository contents
      
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
        
      - name: Update Language Stats
        uses: carolyn-sun/simple-lang-stats@latest
        with:
          PAT: ${{ secrets.PAT }}
          username: ${{ github.repository_owner }}
          
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add README.md
          git diff --staged --quiet || git commit -m "Update language statistics"
          git push
```
