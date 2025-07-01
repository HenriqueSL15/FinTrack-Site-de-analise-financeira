import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    testIsolation: false,
  },
});
