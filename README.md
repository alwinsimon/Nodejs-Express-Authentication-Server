# Node.js Express Authentication Server

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![JWT](https://img.shields.io/badge/JSON%20Web%20Token-v8.5.1-orange)

This repository contains a production-ready authentication server built with Node.js and Express. It leverages two custom npm modules, [base-auth-handler](https://www.npmjs.com/package/base-auth-handler) for authentication handling and [base-error-handler](https://www.npmjs.com/package/base-error-handler) for error management.

## Features

- **Authentication Handling:** Uses [base-auth-handler](https://www.npmjs.com/package/base-auth-handler) for robust authentication with JWT sent in cookies.
- **Error Management:** Utilizes [base-error-handler](https://www.npmjs.com/package/base-error-handler) for effective error handling.
- **Logger:** Implements a production-level logger created with Winston and Morgan, saving logs into a remote MongoDB instance.
- **TypeScript:** The entire package is created using TypeScript for improved type safety and maintainability.

## API Documentation

**Note:** The detailed API documentation is available on Postman. 
Please refer to [API Documentation on Postman](https://documenter.getpostman.com/view/27773540/2s9YeBeZLV).

Additionally, Swagger is integrated for convenient exploration of the API:

- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

You can also access the API documentation in JSON format:

- API Docs JSON: [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

### Dev Server
- Base URL: [http://localhost:3000](http://localhost:3000)

### Prod Server
- Base URL: [https://auth.alwinsimon.com](https://auth.alwinsimon.com)

## Prerequisites

- Node.js v14.17.0 or higher
- Express v4.17.1
- JSON Web Token (JWT) v8.5.1
- MongoDB (for production-level logging)

## Environment Variables

APPLICATION_NAME=AUTH SERVER  

NODE_ENV=development  
(Use development for dev environment and production for prod environment)

PORT=3000  
JWT_KEY=your_jwt_key_here  
JWT_TOKEN_DURATION=30d  
MONGO_DB_URI=mongodburi_here

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alwinsimon/Nodejs-Express-Authentication-Server.git
   ```

2. **Install dependencies:**

   ```bash
   cd Nodejs-Express-Authentication-Server
   ```
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the environment variables listed above.

4. **Run the server:**

   ```bash
   npm run server
   ```

   The server will be running at [http://localhost:3000](http://localhost:3000) or the specified port in your `.env` file.


## Scripts

- **Start - For Dev:** `npm start`
- **Test:** `npm test`
- **Clean:** `npm run clean`
- **Build:** `npm run build`
- **Server - For Prod:** `npm run server`

## Dependencies

- See [package.json](https://github.com/alwinsimon/Nodejs-Express-Authentication-Server/blob/main/package.json) for a detailed list of dependencies.

## Contributing

Feel free to contribute and provide feedback! Create issues for bug reports or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/alwinsimon/Nodejs-Express-Authentication-Server/blob/main/LICENSE) file for details.
