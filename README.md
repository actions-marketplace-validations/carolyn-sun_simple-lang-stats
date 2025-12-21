# Simple Language Stats

Enjoy simplicity. A GitHub Action that automatically generates and updates language statistics in your README profile.

<!-- simple-lang-stats -->
```
58.85% JavaScript
32.56% Fluent
 4.34% CSS
 1.45% MDX
  1.2% TypeScript
 0.86% HTML
 0.44% Swift
 0.15% Shell
 0.06% V
 0.05% Ruby
 0.04% PowerShell
```
*Based on 13 non-forked repositories for Carolyn Sun (carolyn-sun)<br/>Powered by [carolyn-sun/simple-lang-stats](https://github.com/carolyn-sun/simple-lang-stats)*
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
    - cron: '0 */6 * * *'  # Run every 6 hours
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