# Use Node 18 as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /server

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for development
RUN npm install -g nodemon

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend app using nodemon
CMD ["nodemon", "server.js"]
