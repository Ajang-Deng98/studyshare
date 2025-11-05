# Use specific Node.js version for consistency
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=development

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set work directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for development)
RUN npm install && npm cache clean --force

# Copy project files
COPY . .

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]