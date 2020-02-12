[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

# Home Assistant Data Science Portal

This is the source for the [Home Assistant Data Science Portal](https://data.home-assistant.io).

## Updating the docs

Documentation is build using [Docusaurus V2](https://v2.docusaurus.io/).

### Preparing environment

Running the documentation locally requires [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) to be installed. Inside a cloned fork of this repository, run:

```bash
$ yarn
```

This will install [docusaurus](https://www.npmjs.com/package/docusaurus) amongst other things.

### Running docs locally

```bash
$ yarn start
```

### Adding a page

 -   Create new page in `docs/`
 -   Add new doc to `sidebars.json` using the `id:` field in the doc meta data to make it findable by readers.
