# BACKEND TASK JS

This is a Node.JS RestAPI task application powered by NodeJS, Express and MongoDB. The API will serve as the backend for a user management system.When a user is authenticated, an authentication JWToken is added to the header cookies automatically, which has a maxAge of 15 minutes.

Authenticated JWToken is added in the header cookie for security reasons, which easily implies that, the server will send the cookie to the the browser, and the browser will take the responsibility to add the cookie JWToken for each request made to the server.

This secures the JWToken and prevents Cross Site Scripting (XSS) attack. Because JavaScript cannot access it.

![Node API Preview](https://res.cloudinary.com/dymhdpka1/image/upload/v1692715763/Screenshot_2023-08-22_at_3.37.22_PM_stqqyc.png)

---

## Table of contents

- [Dependencies](#dependencies)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Test](#test)
- [License](#license)
- [Postman Documentation](#postman-documentation)

---

## Dependencies

- "bcryptjs": "^2.4.3",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "express-session": "^1.17.3",
- "jsonwebtoken": "^9.0.1",
- "mongodb": "^5.7.0",
- "mongoose": "^7.4.3",
- "jest": "^29.6.3",
- "nodemon": "^3.0.1",
- "supertest": "^6.3.3"

---

## Features

- **Register:** Users can register in the management system application with their username and password which are required fields
- **Login:** Registered users can authenticate with their username and password, JWT sent from the server is saved in the header cookie
- **Dashboard:** This is a protected route only authenticated and authorized users can access it with the help of the JWT saved in the cookie header, attached automatically to the request header from the browser for every request made to the server
- **Logout:** Clears the cookie in the browser header and un-authenticates the user.

![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1692792136/Screenshot_2023-08-23_at_12.57.09_PM_ohq1z5.png)

---

## Setup

Clone this repo to your desktop with $`git clone https://github.com/thecodec/recallo_lite_bkend`

Change directory into the folder $`cd recallo_lite_bkend`

Create a .env file $`touch .env`

Copy these to your `.env file` and feel free to customize according to your need

```txt
 PORT=8040
 JWT_KEY=evilsecret123@
 CORS_ORIGIN=http://localhost:3000
 DB_HOST=mongodb://localhost:27017/
 DB_NAME=backend_test
```

<!-- Run $`npm install` to install all the dependencies and dev dependencies used .

To start the API $`npm run dev` -->

---

## Usage

After you clone this repo to your desktop, go to its root directory and run $`npm install` to install its dependencies.

Once the dependencies are installed, you can run $`npm run dev` to start the application.

On your console you should see, meaning you will be able to access the API on localhost:8040

```javascript
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Server is running on http://0.0.0.0:8040
MongoDB database connected...
```

---

## Test

Unit test with jest was integrated, to test the app, run $`npm run test`

## ![Unit test Preview](https://res.cloudinary.com/dymhdpka1/image/upload/v1692788229/Screenshot_2023-08-23_at_11.56.46_AM_hohpej.png)

<!-- ## License

> You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license. -->

---

## Postman Documentation

Click this [link](https://documenter.getpostman.com/view/12340633/2s9Y5VSiGa) to access the postman documentation of this Backend API task.
