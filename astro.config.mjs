import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ian-j-stewart.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
