import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        levelSeven: resolve(import.meta.dirname, 'level-seven.html'),
        partner: resolve(import.meta.dirname, 'partner-with-us.html'),
        findHelp: resolve(import.meta.dirname, 'find-help.html'),
      },
    },
  },
})
