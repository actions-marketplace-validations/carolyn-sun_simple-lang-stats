# Simple Language Stats

A Cloudflare Worker that returns GitHub user language statistics as an SVG image.

## Usage

Use the URL pattern `https://sls.carolyn.sh/{github-username}` to get the language stats for a GitHub user. 

For example, for the user `carolyn-sun`, use the URL, `https://sls.carolyn.sh/carolyn-sun`.

<a href="https://github.com/carolyn-sun/simple-lang-stats#gh-light-mode-only">
    <img src="https://sls.carolyn.sh/carolyn-sun" />
</a>

<a href="https://github.com/carolyn-sun/simple-lang-stats#gh-dark-mode-only">
    <img src="https://sls.carolyn.sh/carolyn-sun?night=true" />
</a>

## Environment Variables

These are only relevant when deploying your own worker.

- `GITHUB_TOKEN`: Your GitHub personal access token. This is required to access the GitHub API.
- `ENABLE_PRIVATE_ACCESS`: Set to `true` to include private repositories in the statistics. Defaults to `false`.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2Fcarolyn-sun%2Fsimple-lang-stats)
