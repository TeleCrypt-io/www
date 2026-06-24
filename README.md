# TeleCrypt.io — landing

Static landing site for **telecrypt.io**, served at `https://telecrypt.io/`.

> Secure transport for agents and human beings.

Built with [Astro](https://astro.build) on a Vim-styled theme
([astro-vim](https://github.com/albertoperdomo2/astro-vim)), converted to a fully static build.

## Content

| Route             | What                                                              |
| ----------------- | ----------------------------------------------------------------- |
| `/`               | Landing — slogan + Vim command hints                              |
| `/about`          | The slogan, plainly                                               |
| `/technology`     | How Matrix/Synapse works and why this deployment is secure        |
| `/llms`           | Placeholder for an [llms.txt](https://llmstxt.org) (empty for now)|
| `/about.txt`      | Raw plaintext of the slogan                                       |
| `/technology.txt` | Raw plaintext of the technology page                              |
| `/llms.txt`       | Raw [llms.txt](https://llmstxt.org) (minimal for now)             |

The `.txt` files in `public/` are served verbatim — both as the Vim-buffer aesthetic and so agents
can fetch machine-readable text directly.

Navigation is Vim-style: press `:` then a command (`:about`, `:technology`, `:llms`, `:h`, `:q`),
`j`/`k` to scroll, `g`/`G` for top/bottom, `u` to go back.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run check    # astro type-check (optional)
```

## Deploy

This repo holds **source only**; `dist/` is gitignored. On every push to `main`, CI
(`.github/workflows/build.yml`) builds the site and force-pushes the result to the **`dist` branch**.

The TeleCrypt.io server repo serves it:

- `deploy/deploy.sh` clones/fetches this repo's `dist` branch into
  `/home/ubuntu/persistent_data/landing`.
- The shared Caddy mounts that directory and `file_server`s it from the apex catch-all
  (everything not claimed by the Matrix/MAS routes).

**One-time provisioning on the VM:** add a read-only deploy key for this repo (same pattern as the
server repo) so `deploy.sh` can fetch the private `dist` branch. See the server repo's
`deploy/SETUP.md`.
