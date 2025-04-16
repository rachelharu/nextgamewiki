#!/bin/bash

echo "Stopping containers..."
docker compose down --remove-orphans

echo "Removing Docker resources..."
# Remove all stopped containers
docker container prune -f

# Remove all unused images
docker image prune -a -f

# Remove all unused networks
docker network prune -f

# Remove all unused volumes
docker volume prune -f

# Final system cleanup
docker system prune -f

echo "Docker cleanup complete!"

# run command:
# npm run docker:clean