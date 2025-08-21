#Dockerfile contains all the instructions needed to create an image.
#Dockerfile is the blueprint of Docker Image
#Use an offical Node untime as the parent image 
#a set of instrcuctions telling docker how to build a DOCKER Image for our application because we tell DOCKER what we want within the DockerFile

# ENV (enviroment) set's envirment variables during the build process 

# Stage 1: Build stage # specifies the base image to use for the new image
FROM node:18 AS builder

# Set the working directory in the container to /app 
WORKDIR /app

# Copy package.json and package-lock.json into the working directory #COPY copies the files or the direcity from the built context to the image.
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the docker image (. . == *)
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built app from the builder stage
COPY --from=builder /app/dist ./dist

# Make port 3000 available to the world outside this container #Expose informs docker that the container will listen at specified network ports at runtime
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime #default command #starts up the server
CMD [ "npm", "run", "serve" ]