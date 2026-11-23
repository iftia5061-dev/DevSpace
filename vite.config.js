import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Explicitly build every HTML page so all pages are emitted to dist/.
    // Without this, Vite only builds index.html because the other pages are
    // referenced only via <a href> anchors, which Vite's build crawler ignores.
    rollupOptions: {
      input: {
        index: 'index.html',
        about: 'pages/about.html',
        projects: 'pages/projects.html',
        'project-details': 'pages/project-details.html',
        services: 'pages/services.html',
        contact: 'pages/contact.html',
        'admin-login': 'admin/index.html',
        'admin-dashboard': 'admin/dashboard.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
