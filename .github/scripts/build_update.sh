#!/bin/sh

set -e

echo "Deploying application ..."

# Enter maintenance mode

#(php artisan down --message 'The app is being (quickly!) updated. Please try again in a minute.') || true

git fetch origin build
git reset --hard origin/build

# Exit maintenance mode

#php artisan up

echo "Application deployed!"