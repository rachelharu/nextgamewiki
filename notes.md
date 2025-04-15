

Implement your database integration for tracking popular searches first, since that's a core feature you've already planned.
Add Docker next - it's relatively straightforward but demonstrates infrastructure knowledge that many developers lack. A basic Dockerfile for your Next.js app might just specify the Node version, copy your files, run npm install, and set up the startup command.
Add a simple GitHub Actions workflow file that builds and tests your application on push. Even if you don't have extensive tests, this shows you understand CI principles.

If you do decide to add testing later, you could focus on testing the API integration rather than UI rendering since you're already confident in that part.