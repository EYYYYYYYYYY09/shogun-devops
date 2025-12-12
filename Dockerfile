# Use official Nginx image
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy website files to Nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
<<<<<<< HEAD
COPY keydeploy.pem /usr/share/nginx/html/
=======
>>>>>>> b3f81969cd0a769e92ea66c82a1bd4745ffc7751

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]