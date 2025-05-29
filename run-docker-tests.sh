#!/bin/bash

# Script to build and run REST API tests in Docker

echo "🔨 Building Docker image..."
docker build -t rest-api-testing .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo ""
    echo "🧪 Running tests in Docker container..."
    docker run --rm -v "$(pwd)/reports:/app/reports" rest-api-testing
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Tests completed successfully!"
        echo "📊 Test report available at: $(pwd)/reports/html/index.html"
    else
        echo ""
        echo "❌ Tests failed!"
        exit 1
    fi
else
    echo "❌ Failed to build Docker image!"
    exit 1
fi
