#!/bin/bash
echo "Validating service health..."
sleep 10
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$RESPONSE" -eq 200 ]; then
  echo "Service is healthy. HTTP 200 OK."
else
  echo "Service validation failed. HTTP Code: $RESPONSE"
  exit 1
fi