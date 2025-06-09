#!/bin/bash
echo "Docker daemon info:"
docker info
echo "Authenticating to ECR..."
# Get AWS account ID and region automatically (requires IAM permissions on EC2 instance profile)
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
AWS_REGION=$(aws configure get region)
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
echo "Pulling the latest Docker image from ECR..."


# Ensure this repository name matches the one created in ECR EXACTLY.
docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/gamelookup-ecr:latest

docker tag $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/gamelookup-ecr:latest nextjs-app
echo "Image tagged as 'nextjs-app'."