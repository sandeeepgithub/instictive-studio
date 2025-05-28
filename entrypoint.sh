#!/bin/sh

# Seed the database
echo "🌱 Seeding database..."
npx ts-node scripts/seed.ts

# Start the app
echo "🚀 Starting the app..."
npm run start
