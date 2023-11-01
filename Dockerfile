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

# Configure NGINX for your application directly in the Dockerfile
RUN echo "server {" > /etc/nginx/conf.d/myapp.conf \
    && echo "    listen 80;" >> /etc/nginx/conf.d/myapp.conf \
    && echo "    server_name localhost;" >> /etc/nginx/conf.d/myapp.conf \
    && echo "    location / {" >> /etc/nginx/conf.d/myapp.conf \
    && echo "        root /usr/share/nginx/html;" >> /etc/nginx/conf.d/myapp.conf \
    && echo "        index index.html;" >> /etc/nginx/conf.d/myapp.conf \
    && echo "        try_files \$uri /index.html;" >> /etc/nginx/conf.d/myapp.conf \
    && echo "}" >> /etc/nginx/conf.d/myapp.conf

COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
