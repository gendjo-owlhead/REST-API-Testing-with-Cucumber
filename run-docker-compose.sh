#!/bin/bash

# Script to run REST API tests using Docker Compose

echo "🔨 Building and running tests with Docker Compose..."
docker-compose up --build --remove-orphans

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Tests completed successfully!"
    echo "📊 Test report available at: $(pwd)/reports/html/index.html"
else
    echo ""
    echo "❌ Tests failed!"
    exit 1
fi

# Clean up
echo "🧹 Cleaning up containers..."
docker-compose down
