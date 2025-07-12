

FROM node:24

RUN npm i -g pnpm
# Set working directory
WORKDIR /app
# Install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the project (uncomment if using TypeScript)
RUN pnpm run build

# Set environment variables (if needed)
ENV NODE_ENV=production

# Expose the port your server listens on (change if needed)
EXPOSE 3000

# Start the server
CMD ["node", "./dist/main.js"]

