#!/bin/bash

docker compose up --build -d

cd backend
./vendor/bin/sail up --build -d

while ! ./vendor/bin/sail ps | grep -q "healthy"; do
  echo "Waiting for Sail services to be ready..."
  sleep 5
done

./vendor/bin/sail artisan migrate && ./vendor/bin/sail artisan db:seed