# BACKEND TASK JS

This is a node.js RestAPI task application powered by NodeJS, Express and MongoDB that provides the main functions you'd expect from a chat, such as emojis, private messages, an admin system, etc.

![Chat Preview](http://i.imgur.com/lgRe8z4.png)

---

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Sources](#sources)
- [Demo](#demo)

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
- **Logout:** All the above plus send global alerts and promote/demote users

---

## Setup


Clone this repo to your desktop with $`git clone https://github.com/thecodec/recallo_lite_bkend`

Change directory into the folder $`cd recallo_lite_bkend`

Run $`npm install` to install all the dependencies.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.


Copy these to your `.env`

```javascript
 JWT_KEY=evilsecret123@

 PORT=8040

 CORS_ORIGIN=http://localhost:3000

 DB_HOST=mongodb://localhost:27017/

 DB_NAME=backend_test
```

---

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:3000

To give yourself administrator permissions on the chat, you will have to type `/role [your-name]` in the app console.

---

## License

> You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
