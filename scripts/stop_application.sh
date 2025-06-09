#!/bin/bash
echo "Stopping existing Docker container (if running)..."
if [ $(docker ps -q -f name=nextjs-app-container) ]; then
  docker stop nextjs-app-container
  echo "Container stopped."
else
  echo "No running container found."
fi
echo "Removing old Docker container (if exists)..."
if [ $(docker ps -aq -f name=nextjs-app-container) ]; then
  docker rm nextjs-app-container
  echo "Container removed."
else
  echo "No old container found."
fi
echo "Removing old Docker image (optional, to save space)..."
if [ $(docker images -q nextjs-app) ]; then
  docker rmi nextjs-app || true
  echo "Old image removed."
else
  echo "No old image to remove."
fi