# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Define environment variable for PostgreSQL connection
ENV DATABASE_URL=postgresql://user:user@db:5432/mydb?schema=public

# Start the Node.js app
CMD ["npm", "start"]
