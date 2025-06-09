#!/bin/bash
echo "Starting new Docker container..."

# Fetch secrets from AWS SSM Parameter Store (SecureString parameters)
# The EC2 instance's IAM role must have permission to get these parameters.
# >> IMPORTANT: REPLACE THESE WITH YOUR EXACT PARAMETER NAMES FROM PHASE II.1.A <<
# Each parameter needs its own 'aws ssm get-parameters' call.
export DATABASE_URL=$(aws ssm get-parameters --names /nextgamewiki/DATABASE_URL --with-decryption --query Parameters[0].Value --output text)
export RAWG_API_KEY=$(aws ssm get-parameters --names /nextgamewiki/RAWG_API_KEY --with-decryption --query Parameters[0].Value --output text)
export RAPID_API_KEY=$(aws ssm get-parameters --names /nextgamewiki/RAPID_API_KEY --with-decryption --query Parameters[0].Value --output text)
export NEXT_PUBLIC_RAWG_API_KEY=$(aws ssm get-parameters --names /nextgamewiki/NEXT_PUBLIC_RAWG_API_KEY --with-decryption --query Parameters[0].Value --output text)
# Add more export lines for every secret you stored individually in Parameter Store!
# Example: export MY_CUSTOM_VAR=$(aws ssm get-parameters --names [YOUR_SSM_PATH_PREFIX]MY_CUSTOM_VAR --with-decryption --query Parameters[0].Value --output text)

# Run the new Docker container, passing the environment variables
# The -e flags pass the values from the exported shell variables into the Docker container.
docker run -d \
  -p 3000:3000 \
  --name nextjs-app-container \
  -e DATABASE_URL="$DATABASE_URL" \
  -e RAWG_API_KEY="$RAWG_API_KEY" \
  -e RAPID_API_KEY="$RAPID_API_KEY" \
  -e NEXT_PUBLIC_RAWG_API_KEY="$NEXT_PUBLIC_RAWG_API_KEY" \
  # Add more -e lines here for any other environment variables you exported above!
  nextjs-app # This is the image we tagged in after_install.sh

echo "Docker container started."