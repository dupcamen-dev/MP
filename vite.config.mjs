import { defineConfig } from 'vite';

// Client build: Vite defaults. SSR build (used only to prerender static HTML) goes to dist-ssr as ESM.
export default defineConfig(({ isSsrBuild }) => ({
  build: isSsrBuild
    ? {
        outDir: 'dist-ssr',
        emptyOutDir: true,
        rollupOptions: { output: { entryFileNames: '[name].mjs', format: 'es' } },
      }
    : {},
}));
