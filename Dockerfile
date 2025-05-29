# Use Node.js 18 LTS as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Install development dependencies needed for running tests
RUN npm install --save-dev @types/node multiple-cucumber-html-reporter ts-node tsconfig-paths

# Copy the rest of the application code
COPY . .

# Create reports directory
RUN mkdir -p reports/json reports/html

# Set proper permissions
RUN chmod +x node_modules/.bin/*

# Expose port (not necessary for this use case but good practice)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV CI=true

# Default command to run tests
CMD ["npm", "test"]
