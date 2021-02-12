import vue from '@vitejs/plugin-vue'

/*
 * @type {import('vite').UserConfig}
*/

export default {
  plugins: [vue()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    outDir:'../docs',
    assetsDir:'./assets',
    emptyOutDir:true,
    target:'modules',
  }
}

// vite build -c vite.config.js
// https://vitejs.dev/guide/build.html#library-mode
