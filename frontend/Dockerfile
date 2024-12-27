# Use Node 18 as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the frontend port
EXPOSE 5173

# Start the frontend app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
