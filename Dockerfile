# Use an official Node.js runtime as the base image
FROM node:16.17.0

# Set the working directory within the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

RUN npm run build 

FROM nginx:latest
#RUN rm -f /etc/nginx/conf.d/default.conf

# Copy the NGINX configuration specific to your application
COPY nginx.conf /etc/nginx/conf.d/


COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]