import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Static site served from GitHub Pages at https://www.telecrypt.io/ (apex telecrypt.io 301-redirects here).
// No SSR adapter: `astro build` emits a plain dist/ of HTML/CSS/JS that GitHub Pages serves.
export default defineConfig({
  site: 'https://www.telecrypt.io',
  output: 'static',
  integrations: [tailwind()],
});
