# Use Node.js with TypeScript
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 443

# Start the app
CMD ["npm", "run", "start"]
