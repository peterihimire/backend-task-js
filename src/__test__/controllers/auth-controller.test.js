const httpStatusCodes = require("../../utils/http-status-codes");
const BaseError = require("../../utils/base-error");
const { register } = require("../../controllers/auth-controller");
const User = require("../../models/User");
const { hashPassword } = require("../../utils/helpers");

describe("register", () => {
  // Mock req, res, and next
  const req = {
    body: {},
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    // Clear the mock function calls before each test
    res.status.mockClear();
    res.json.mockClear();
    next.mockClear();
  });

  test("should return UNPROCESSABLE_ENTITY if password is missing", async () => {
    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(
      httpStatusCodes.UNPROCESSABLE_ENTITY
    );
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      msg: "Password missing required field.",
    });
  });

  test("should return UNPROCESSABLE_ENTITY if username is missing", async () => {
    req.body.password = "somePassword";

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(
      httpStatusCodes.UNPROCESSABLE_ENTITY
    );
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      msg: "Username missing required field.",
    });
  });

  test("should return BAD_REQUEST if user already exists", async () => {
    req.body.password = "somePassword";
    req.body.username = "existingUser";

    User.findOne = jest.fn().mockResolvedValue({});

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new BaseError(
        "Account already exist, login instead .",
        httpStatusCodes.BAD_REQUEST
      )
    );
  });

  // test("should create a new user and return success response", async () => {
  //   req.body.password = "somePassword";
  //   req.body.username = "newUser";

  //   User.findOne = jest.fn().mockResolvedValue(null);
  //   User.create = jest.fn().mockResolvedValue({
  //     _doc: {
  //       username: "newUser",
  //       password: "hashedPassword",
  //       // ... other properties
  //     },
  //   });

  //   const hashedPassword = hashPassword(req.body.password);

  //   await register(req, res, next);

  //   expect(User.create).toHaveBeenCalledWith({
  //     username: "newUser",
  //     password: hashedPassword,
  //   });

  //   expect(res.status).toHaveBeenCalledWith(httpStatusCodes.CREATED);
  //   expect(res.json).toHaveBeenCalledWith({
  //     status: "success",
  //     msg: "Account created!",
  //     data: {
  //       // ... expected user data (excluding password and __v)
  //     },
  //   });
  // });

  test("should handle internal server error", async () => {
    req.body.password = "somePassword";
    req.body.username = "newUser";

    User.findOne = jest.fn().mockRejectedValue(new Error("Some error"));

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].statusCode).toBe(
      httpStatusCodes.INTERNAL_SERVER
    );
  });
});

// const { register } = require("../../controllers/auth-controller");
// const User = require("../../models/User");
// const { hashPassword } = require("../../utils/helpers");

// jest.mock("../../models/User");
// jest.mock("../../utils/helpers.js", () => ({
//   hashPassword: jest.fn(() => "faux password"),
// }));

// const request = {
//   body: {
//     username: "faux username",
//     password: "faux password",
//   },
// };

// const response = {};
// response.json = jest.fn();
// response.status = jest.fn(() => response);
// // const response = {
// //   status: jest.fn().mockReturnThis(),
// //   json: jest.fn(),
// // };

// const next = jest.fn((x) => x);

// beforeEach(() => {
//   // Clear the mock function calls before each test
//   response.status.mockClear();
//   response.json.mockClear();
//   next.mockClear();
// });

// describe("Register Route", () => {
//   it("Should return error if user exist", async () => {
//     User.findOne.mockImplementationOnce(() => ({
//       id: 1,
//       username: "peterihimire",
//       password: "123456",
//     }));
//     await register(request, response, next);
//     expect(next).toHaveBeenCalledWith(
//       Error("Account already exist, login instead .")
//     );
//     expect(next).toHaveBeenCalledTimes(1);
//   });

//   it("Should return status  201", async () => {
//     await register(request, response, next);
//     User.findOne.mockImplementationOnce(() => undefined);
//     User.create.mockResolvedValueOnce({
//       id: 1,
//       username: "peterihimire",
//       password: "123456",
//     });
//     expect(hashPassword).toHaveBeenCalledWith("faux password");
//     expect(User.create).toHaveBeenCalledWith({
//       username: "faux username",
//       password: "faux password",
//     });

//     expect(response.status).toHaveBeenCalledWith(201);
//   });

//   // it("Should fail when input field(s) is missing ", async () => {
//   //   expect.assertions(2);

//   //   const res = mockResponse();
//   //   const req = mockRequest();
//   //   const next = mockNext;

//   //   await register(req, res, next);
//   //   // expect(next).toHaveBeenCalledTimes(1);
//   //   expect(next).toHaveBeenCalledWith(
//   //     Error("Password missing required field.")
//   //   );
//   // });

//   // const response = {
//   //   status: jest.fn((x) => x),
//   //   send: jest.fn((x) => x),
//   // };
// });
