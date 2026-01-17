# Running tests

This project includes unit tests (Vitest) and end-to-end tests (Playwright).

1. Install dependencies (run from project root):

   rm -rf node_modules package-lock.json
   npm cache verify
   npm install

2. Install test dev-dependencies (if not already present):

   npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react @playwright/test

3. Run unit tests:

   npm run test

4. Run e2e tests (make sure dev server is running at http://localhost:3000):

   npm run test:e2e

