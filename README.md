## 😎 Introduction
This repository contains the backend test for Nolatech, implemented using TypeScript and Node.js. The project is designed to demonstrate various backend functionalities, including API development, authentication, and database management.

## ⚒ How to Install

To get started with the project, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/CodeIota/nolatech-backend-test-ts.git
```

2. Navigate to the project directory:

```bash
cd nolatech-backend-test-ts
```

3. Install the project dependencies:

```bash
npm install
```

### 🚀 Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the server in development mode.
## ⚙️ Configuration
### Database Configuration

Make sure to set up your database credentials in the .env.development.local file. This file is used for local development and Docker environments. Do not commit this file to version control.

Here’s an example of how the .env.development.local file should be structured:

Make sure to set up your database credentials in the `.env.development.local` file. This file is used for local development and Docker Env. It should not be committed to version control. Here's an example of how the `.env.development.local` file should be structured:

- **DB_HOST=** 127.0.0.1
- **DB_PORT=** 27017
- **DB_DATABASE=** dev
- **LOG_FORMAT=** dev
- **LOG_DIR=** ../logs
- **EMAIL_SERVICE=** gmail
- **MAIL_USER=**
- **MAIL_PASS=**

## Docker Configuration

To create a Docker development environment, run:

```bash
npm run docker:dev
```

After setting up the Docker environment, you can initialize the database with random data using:

```bash
npm run init-db
```

🧪 Testing

To run tests, use the following commands:

Run all tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### 📬 Postman Configuration

For API testing, you can import the Postman collection included in the repository. The collection file is named Nolatech Backend.postman_collection.json. This will allow you to quickly set up and test the endpoints defined in the project.

