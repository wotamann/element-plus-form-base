import vue from '@vitejs/plugin-vue'

/*
 * @type {import('vite').UserConfig}
*/

export default {
  plugins: [vue()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    outDir:'../umd',
    emptyOutDir:true,
    lib: {
      entry: './src/formbase/vFormBase.vue',
      name: 'formbase',
      formats: ('es'|'umd'|'iife')
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue','vue-router'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          ['vue-route']: 'router',
        }
      }
    }
  }
}

// vite build -c vite.config.js
// https://vitejs.dev/guide/build.html#library-mode