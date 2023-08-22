# BACKEND TASK JS

This is a Node.JS RestAPI task application powered by NodeJS, Express and MongoDB. The API will serve as the backend for a user management system.When a user is authenticated, an authorization token is added to the header cookies automatically, which has a maxAge of 15 minutes. 

Authentication token is added in the header cookie for security reasons, which easily implies that 

![Node API Preview](https://res.cloudinary.com/dymhdpka1/image/upload/v1692715763/Screenshot_2023-08-22_at_3.37.22_PM_stqqyc.png)

---

## Table of contents

- [Dependencies](#dependencies)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)
- [Postman Documentation](#postman-documentation)

---

## Dependencies

- Node version: 18.0
- Express version: 4.18.2
- Bcryptjs version: 2.4.3
- Mongodb: 8.10.0
- Mongoose version: 2.3.4
- Cookieparser version: 6.29.2
- Cors version: 15.0
- dotenv version: 12
- Jest version: 32
- Nodemon version: 11
- Supertest version: 12

---

## Features

- **Register:** Users can register with their username and password
- **Login:** Registered users can login with their username and password
- **Dashboard:** This is a protected route only authenticated and authorized users can access it
- **Logout:** Clears the cookie in the browser header and un-authenticates the user.

<!-- ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1692715763/Screenshot_2023-08-22_at_3.38.31_PM_vyegaa.png) -->

---

## Setup

Clone this repo to your desktop with $`git clone https://github.com/thecodec/recallo_lite_bkend`

Change directory into the folder $`cd recallo_lite_bkend`

Create a .env file $`touch .env`

Copy these to your `.env`

```javascript

 PORT=8040

 JWT_KEY=evilsecret123@

 CORS_ORIGIN=http://localhost:3000

 DB_HOST=mongodb://localhost:27017/

 DB_NAME=backend_test
```

Run $`npm install` to install all the dependencies and dev dependencies used .

To start the API $`npm run dev`

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:3000

To give yourself administrator permissions on the chat, you will have to type `/role [your-name]` in the app console.

---

## License

> You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.

## Postman Documentation

Click this [link](https://documenter.getpostman.com/view/12340633/2s9Y5VSiGa) to access the postman documentation of this Backend API task.
