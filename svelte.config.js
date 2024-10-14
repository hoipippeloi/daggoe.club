import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
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