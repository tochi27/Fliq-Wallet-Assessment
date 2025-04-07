# Wallet Management API

## Description

This project is a backend system built with Express.js, TypeScript, and JSON-based storage. It supports user authentication, wallet management (including creation, funding, and transfers), and integrates logging using `winston`. I made several additional improvements(user authentication, in-storage json files, winston and logger for terminal output) to the project after carefully considering the process for achieving the assessment. These additions enhance the structure, organization, and overall logic of the project, making it more cohesive and well-thought-out for me to execute.

### Features:

- **User Authentication**:
  - Register a new user
  - Login and generate JWT token
  - Protect routes with token authentication
- **Wallet Management**:
  - Create a wallet
  - Fund the wallet
  - Transfer funds between wallets
  - Save wallets in a JSON file
- **Logging**:
  - Log all HTTP requests and responses using `express-winston` and `winston`

## Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for building the API
- **TypeScript**: Superset of JavaScript for type safety
- **bcryptjs**: For password hashing
- **jsonwebtoken**: For generating and verifying JWTs
- **winston**: Logger for logging HTTP requests
- **express-winston**: Middleware for logging HTTP requests in Express
- **Postman**: Environment for endpoint testing

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tochi27/wallet-management-api.git
cd wallet-management-api

### 2. Install Dependencies

```bash
npm install

### 3. Set Environment Variables
Create a .env file at the root of your project and add:

JWT_SECRET=your_secret_key

### 4. Run the Application
Run the application in development mode:

```bash
npm run dev

## Here's the published documentation of the tests in Postman
https://documenter.getpostman.com/view/28967699/2sB2cVe2Qr