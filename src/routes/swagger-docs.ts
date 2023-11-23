/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated user-id.
 *         email:
 *           type: string
 *           description: Registered email of the user.
 *       example:
 *         id: 64a6ba81ab3fbe09eddb6d66
 *         email: john@example.com
 *
 */

/**
 * @swagger
 * paths:
 *   /health:
 *     get:
 *       summary: Check the health of the application
 *       description: Returns the health status of the application and its systems along with the current date and time.
 *       tags:
 *         - Health
 *       responses:
 *         '200':
 *           description: Application and systems are up and running
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: Status message indicating that the application and systems are up.
 *                   dateTime:
 *                     type: string
 *                     description: Current date and time in web format.
 */


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoint for user authentication
 *
 * paths:
 *   /api/v1/currentuser:
 *     get:
 *       summary: Get the current user
 *       description: Retrieves information about the currently authenticated user.
 *       tags: [Users]
 *       security:
 *         - cookieAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation - Valid JWT
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   currentUser:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user's ID
 *                       email:
 *                         type: string
 *                         description: The user's email address
 *                       iat:
 *                         type: integer
 *                         description: Token issuance timestamp
 *                       exp:
 *                         type: integer
 *                         description: Token expiration timestamp
 *         '207':
 *           description: Successful operation - No valid JWT
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   currentUser:
 *                     type: null
 *                     description: Indicates that no valid JWT was provided.
 */

/**
 * @swagger
 * paths:
 *   /api/v1/signin:
 *     post:
 *       summary: Sign in a user
 *       description: Authenticates a user and returns user information along with a JWT token in the response cookies.
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the user.
 *                   example: tester@testing.com
 *                 password:
 *                   type: string
 *                   description: The password of the user.
 *                   example: password@123
 *       responses:
 *         '200':
 *           description: Successful authentication
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user's ID
 *                     example: 655a1560766796198f42ad41
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *                     example: tester@testing.com
 *         '400':
 *           description: Bad Request - Invalid credentials
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           description: Error message indicating invalid credentials.
 *                           example: Invalid Credentials.
 */

/**
 * @swagger
 * paths:
 *   /api/v1/signup:
 *     post:
 *       summary: Sign up a new user
 *       description: Creates a new user account and returns user information along with a JWT token in the response cookies.
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the user.
 *                   example: tester3@testing.com
 *                 password:
 *                   type: string
 *                   description: The password of the user.
 *                   example: password@123
 *       responses:
 *         '201':
 *           description: User created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user's ID
 *                     example: 655e1f5d169574e1c6745fb5
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *                     example: tester3@testing.com
 *         '400':
 *           description: Bad Request - Email already exists.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           description: Error message indicating the cause of the bad request.
 *                           example: Email already exists.
 *         '422':
 *           description: Unprocessable Entity - Invalid Login Parameters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           description: Error message indicating the cause of the bad request.
 *                           example: Invalid Login Parameters.
 */

/**
 * @swagger
 * paths:
 *   /api/v1/signout:
 *     post:
 *       summary: Sign out the current user
 *       description: Clears the authentication token, signing the user out.
 *       tags: [Authentication]
 *       responses:
 *         '200':
 *           description: User signed out successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: Sign-out status message
 *                     example: Signed out.
 *         '400':
 *           description: Bad Request - Not Authorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           description: Error message indicating not authorized.
 *                           example: Not Authorized.
 */
