import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Options for adapter-static
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false
    }),
    alias: {
      $lib: 'src/lib',
      $components: 'src/components',
      $routes: 'src/routes',
      $stores: 'src/stores',
      $utils: 'src/utils',
      $types: 'src/types',
      $constants: 'src/constants',
      $assets: 'src/assets',
      $styles: 'src/styles',
      $hooks: 'src/hooks'
    }
  },
  preprocess: vitePreprocess()
};
export default config;
