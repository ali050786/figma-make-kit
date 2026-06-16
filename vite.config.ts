import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Dev server — only active during `pnpm dev`, ignored by Figma Make
  server: {
    port: 5173,
    open: true,
  },

  // Build config — only applied during `pnpm build` (i.e. the Figma Make kit build)
  // During `pnpm dev` this is omitted so Vite runs in app mode with index.html
  ...(command === 'build' ? {
    build: {
      lib: {
        entry: [
          './src/index.ts',
        ],
        formats: [
          'es',
        ],
        cssFileName: 'style',
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
        },
      },
    },
  } : {}),
}))