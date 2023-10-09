# Node Express, MongoDB and Mongoose Boilerplate

A robust and scalable boilerplate for building Node Express applications. This boilerplate is designed with best practices in mind, separating concerns, handling logging efficiently, and managing environment-specific configurations using .env.

This boilerplate also has been configured to work seamlessly with MongoDB, a popular NoSQL database, and uses Mongoose as an elegant MongoDB object modeling for Node.js.

## Table of Contents

Features
Getting Started
Scripts
Dependencies
File Structure
Logging
Environment Variables
MongoDB connection
Mongoose
Database Configuration

## Features

Express Configuration Isolation: Separates app.js (Express configurations) and server.js (server setup).
Logging with Winston: Integrates the winston library for efficient logging.
HTTP Logging with Morgan: Uses morgan for HTTP request/response logging, activated in development mode.
Environment Variable Management: Utilizes dotenv for environment-specific settings.

## Getting Started

Clone the repository to your local machine.
Navigate to the project directory.
Install the dependencies using npm install.
Set up your .env file at the root of your project (refer to Environment Variables section).
Run the server in development mode using npm run start:dev or in production using npm run start:prod.

## Scripts

start:dev: Starts the server in development mode.
start:prod: Starts the server in production mode.

## Dependencies

express: Fast, unopinionated, minimalist web framework for Node.js.
morgan: HTTP request logger middleware for Node.js.
winston: A logger for just about everything.
dotenv: Loads environment variables from .env.
... and more! See package.json for a complete list.

## File Structure

app.js: Holds Express-specific configurations.
server.js: Responsible for setting up and running the server.
/utils/logger.js: Winston logger configuration.

## Logging

Winston: Used for logging application-specific details. It's configured to display logs with timestamps.
Morgan: Used in development mode to log HTTP requests.

## Environment Variables

This boilerplate uses dotenv to manage environment variables. Ensure you have a .env file at the root of the project with the following variables:

PORT: Port number for the application to run on (default is 3000).
... and any other environment-specific variables you need.

## MongoDB Connection:

Separation of Concerns: The connection logic for MongoDB has been separated out into utils/database/mongoDB.js.

Environment-aware Connection String: Depending on the environment (development or production), the boilerplate chooses the appropriate connection string (DATABASE_LOCAL or DATABASE_REMOTE) from the .env file.

Robust Error Handling: In case the connection to the MongoDB server fails, the server logs the error and shuts down gracefully.

## Mongoose:

Object Data Modeling (ODM): Mongoose provides a straight-forward, schema-based solution to model your application data. This includes built-in type casting, validation, query building, and more.

## Database Configuration:

Add the following environment variables to your .env file:

DATABASE_LOCAL: Your MongoDB connection string for your local database.

DATABASE_REMOTE: Your MongoDB connection string for your production database. Ensure this remains confidential to protect your production data.
