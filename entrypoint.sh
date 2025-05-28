#!/bin/sh

# Make it wait for 10 sec so mongo can start accepting connections
sleep 10

# Seed the database
echo "🌱 Seeding database..."
npx ts-node scripts/seed.ts

# Start the app
echo "🚀 Starting the app..."
npm run start
