// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: 部署後請換成你的實際網址，例如 https://yourname.vercel.app
  site: 'https://example.com',
  integrations: [sitemap()],
});
