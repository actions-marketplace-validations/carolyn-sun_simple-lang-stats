# Simple Language Stats

Enjoy simplicity. A GitHub Action that automatically generates and updates language statistics in your README.

<!-- simple-lang-stats -->
<div style="width: 100%; overflow-x: auto;">
<style>
.responsive-lang-table {
  width: 100%;
  max-width: 100%;
  table-layout: auto;
}
.responsive-lang-table td {
  white-space: nowrap;
}
@media (max-width: 768px) {
  .responsive-lang-table {
    font-size: 0.9em;
  }
  .responsive-lang-table td {
    padding-right: 1em !important;
  }
}
@media (max-width: 480px) {
  .responsive-lang-table {
    font-size: 0.8em;
  }
  .responsive-lang-table td {
    padding-right: 0.8em !important;
  }
}
</style>
<table class="responsive-lang-table" style="border-collapse: collapse; border: none; background: none; margin: 0; padding: 0; font-size: 1em; border-spacing: 0;">
<tr style="border: none; background: none;"><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">TypeScript 59.43%</td><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">JavaScript 14.46%</td><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">Shell 10.74%</td></tr>
<tr style="border: none; background: none;"><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">V 5.19%</td><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">Ruby 3.76%</td><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">CSS 3.63%</td></tr>
<tr style="border: none; background: none;"><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">MDX 2.56%</td><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">PowerShell 0.22%</td><td style="padding: 0 1.5em 0 0; margin: 0; border: none; background: none;"></td></tr>
</table>
</div>


Based on 7 repositories for Carolyn Sun (carolyn-sun)
<!-- /simple-lang-stats -->

## Quick Start

Add this marker to your README.md where you want the language statistics to appear:

```markdown
<!-- simple-lang-stats -->
<!-- /simple-lang-stats -->
```

The action will automatically insert your language statistics between these markers.

Then, add it to your workflow file (e.g., `.github/workflows/update-stats.yml`):

```yaml
name: Update Language Stats

on:
  schedule:
    - cron: '0 */6 * * *'  # Run every 6 hours
  workflow_dispatch:  # Allow manual trigger

jobs:
  update-stats:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Update Language Stats
        uses: carolyn-sun/simple-lang-stats@latest
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          username: ${{ github.repository_owner }}
          
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add README.md
          git diff --staged --quiet || git commit -m "Update language statistics"
          git push
```

Set a GitHub_TOKEN secret in your repository settings to include the data of private repositories. `Repo` scope is sufficient.