# Use the official MySQL image as the base image
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_DATABASE=basketball_blog_db
ENV MYSQL_ROOT_PASSWORD=serch
ENV MYSQL_USER=sergio
ENV MYSQL_PASSWORD=serch

# Add your schema SQL script to the docker-entrypoint-initdb.d directory
COPY schema.sql /docker-entrypoint-initdb.d/

# Expose port 3306 to enable communication to/from the server
EXPOSE 3306
