import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

// GitHub Pages only has index.html at the root, so deep links such as /works/aigc fell through to
// 404.html and answered with a 404 status before redirecting. A copy of index.html in each route's
// folder makes them answer 200. Keep this list in step with the routes in src/App.tsx.
const appRoutes = ['works', 'works/aigc', 'works/product-design', 'works/off-hours', 'works/daymark-email', 'resume']

function routeIndexCopies(): Plugin {
  let outDir = ''
  return {
    name: 'route-index-copies',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      for (const route of appRoutes) {
        mkdirSync(resolve(outDir, route), { recursive: true })
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, route, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), routeIndexCopies()],
  base: '/Carlton-Shi-s-Portfolio/',
})
