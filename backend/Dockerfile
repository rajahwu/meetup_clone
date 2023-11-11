# Use the official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Navigate to the backend folder
WORKDIR /usr/src/app/backend

# Run the build command
RUN npm install && \
    npm run build && \
    npm run sequelize db:migrate && \
    npm run sequelize db:seed:all

# Navigate back to the root working directory
WORKDIR /usr/src/app

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start", "--prefix", "backend"]
