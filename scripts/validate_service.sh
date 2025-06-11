#!/bin/bash
set -euxo pipefail # Enable verbose debugging and exit on error

APP_PORT=3000
HEALTH_CHECK_URL="http://localhost:$APP_PORT"

INITIAL_SLEEP=30    # Initial delay before first health check attempt (seconds)
MAX_RETRIES=10      # Number of times to retry health check after initial sleep
RETRY_INTERVAL=15   # Seconds to wait between each retry attempt
                    # Total potential script run time: 30s + (10 * 15s) = 180 seconds (3 minutes)

echo "--- Starting ValidateService hook ---"
echo "Attempting to connect to: $HEALTH_CHECK_URL"
echo "Initial sleep: $INITIAL_SLEEP seconds"
echo "Max retries: $MAX_RETRIES, Retry interval: $RETRY_INTERVAL seconds"

echo "Sleeping for $INITIAL_SLEEP seconds before first health check..."
sleep $INITIAL_SLEEP

for i in $(seq 1 $MAX_RETRIES); do
  echo "--- Health Check Attempt $i/$MAX_RETRIES ---"
  echo "Executing: curl -s -o /dev/null -w \"%{http_code}\" \"$HEALTH_CHECK_URL\""

  CURL_HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_CHECK_URL")
  CURL_EXIT_CODE=$?

  echo "Curl Exit Code: $CURL_EXIT_CODE"
  echo "HTTP Status Code: $CURL_HTTP_CODE"

  if [ "$CURL_EXIT_CODE" -eq 0 ] && [ "$CURL_HTTP_CODE" -eq 200 ]; then
    echo "SUCCESS: Service is healthy (HTTP 200 OK)."
    exit 0 # Script exits with success
  else
    echo "FAILURE: Service not healthy."
    echo "Details: HTTP Code: $CURL_HTTP_CODE. Curl Exit Code: $CURL_EXIT_CODE."

    if [ "$i" -eq "$MAX_RETRIES" ]; then
      echo "ERROR: Maximum retries ($MAX_RETRIES) reached. Service validation failed."
      echo "--- ValidateService hook FAILED ---"
      exit 1 # Script exits with failure after exhausting retries
    fi

    echo "Retrying in $RETRY_INTERVAL seconds..."
    sleep $RETRY_INTERVAL
  fi
done

# Fallback: This line should ideally not be reached if the loop logic is correct.
echo "ERROR: Unexpected script state. Exiting with failure."
exit 1