# Use an official Node runtime as a parent image
FROM node:18 AS Build

# Set the working directory in the container
WORKDIR /app

# Install Git
RUN apt-get update && \
    apt-get install -y git

# Install Angular CLI
RUN npm install -g @angular/cli@latest

# Install app dependencies
RUN npm install

COPY . .

# Stage 2 - Deploy the production environment
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Angular app build from the 'build environment'
COPY --from=build app/dist/gamelog /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
