#### GameLookup
A full-stack web application for discovering video games, built as a technical showcase.

Frontend:

- Next.js 14 with App Router
- React with TypeScript
- Mantine UI and CSS for styling

Backend:

- Prisma ORM with PostgreSQL
- External API integration

Infrastructure & DevOps:

- AWS ECS
- AWS EC2
- AWS CodePipeline
- AWS VPC
- AWS CloudFormation
- Docker

Testing:

- Vitest 
- Playwright

[TESTS.md](TESTS.md)

 Key Features

- Real-time game data fetching and display
- Responsive design across all devices
- Database integration
- Production-ready deployment
- Unit and E2E testing

 Architecture Highlights

- Database Design: Normalized schema with Prisma ORM
- Performance: Server-side rendering with Next.js
- Scalability: Containerized deployment on AWS infrastructure
- DevOps: Environment variable management and production configuration

This project demonstrates full-stack development skills including React/Next.js, database design, API integration, and cloud deployment with AWS

## Docker
This repo includes both production and development Docker Compose setups.

Production compose:
- `docker-compose.yml` builds the app image and runs it on port 3000.
- Requires `DATABASE_URL`, `RAWG_API_KEY`, `RAPID_API_KEY`, `NEXT_PUBLIC_RAWG_API_KEY`.
- Runs `npm run build` then `npm start` inside the container.

Development compose:
- `docker-compose-dev.yml` uses the `development` stage from `Dockerfile`.
- Exposes ports 3000, 9229, 9230 for app + debugging.
- Runs `npm run dev` with local code mounted.

Common commands:
```bash
# Production (uses docker-compose.yml)
docker compose -f docker-compose.yml up --build

# Development (uses docker-compose-dev.yml)
docker compose -f docker-compose-dev.yml up --build

# Stop and remove containers/networks
docker compose -f docker-compose.yml down
docker compose -f docker-compose-dev.yml down

# Rebuild without cache
docker compose -f docker-compose.yml build --no-cache
docker compose -f docker-compose-dev.yml build --no-cache

# View logs
docker compose -f docker-compose.yml logs -f
docker compose -f docker-compose-dev.yml logs -f

# List running containers for this project
docker compose -f docker-compose.yml ps
docker compose -f docker-compose-dev.yml ps
```

Local Docker build/run (no compose):
```bash
# Build the image
docker build -t nextjs-app .

# Run the container (set env vars in your shell first)
docker run --rm -p 3000:3000 \
  -e DATABASE_URL="$DATABASE_URL" \
  -e RAWG_API_KEY="$RAWG_API_KEY" \
  -e RAPID_API_KEY="$RAPID_API_KEY" \
  -e NEXT_PUBLIC_RAWG_API_KEY="$NEXT_PUBLIC_RAWG_API_KEY" \
  nextjs-app
```

## Scripts
Deployment helper scripts live in `scripts/` (used by CodeDeploy hooks in this repo).

- `scripts/after_install.sh` logs into ECR and pulls the latest image, tagging it as `nextjs-app`.
- `scripts/start_application.sh` fetches secrets from AWS SSM and runs the container.
- `scripts/stop_application.sh` stops/removes the container and optionally removes the image.
- `scripts/validate_service.sh` polls `http://localhost:3000` until the service is healthy.
- `scripts/docker-cleanup.sh` prunes unused Docker resources.

Run scripts directly (from repo root):
```bash
bash scripts/after_install.sh
bash scripts/start_application.sh
bash scripts/stop_application.sh
bash scripts/validate_service.sh
bash scripts/docker-cleanup.sh
```

AWS deployment hooks:
- These scripts are executed by CodeDeploy on the EC2 instance during a deployment, not from your local machine.
- CodeDeploy runs them in order to stop the old container, pull/tag the new image from ECR, start the new container with SSM secrets, and validate health.

## CI/CD Pipeline
<img width="1847" height="725" alt="Screenshot from 2025-07-23 17-18-43" src="https://github.com/user-attachments/assets/3d2e5889-f235-4c20-9160-41357c1da09b" />
