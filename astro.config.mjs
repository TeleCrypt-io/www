import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Static site served by the TeleCrypt.io Caddy under https://telecrypt.io/.
// No SSR adapter: `astro build` emits a plain dist/ of HTML/CSS/JS that Caddy file_server's.
export default defineConfig({
  site: 'https://telecrypt.io',
  output: 'static',
  integrations: [tailwind()],
});
