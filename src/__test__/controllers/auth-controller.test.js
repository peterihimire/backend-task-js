const httpStatusCodes = require("../../utils/http-status-codes");
const BaseError = require("../../utils/base-error");
const { register } = require("../../controllers/auth-controller");
const User = require("../../models/User");
const { hashPassword } = require("../../utils/helpers");

jest.mock("../../models/User");
jest.mock("../../utils/helpers.js", () => ({
  hashPassword: jest.fn(() => "faux password"),
}));

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

  test("should create a new user and return success response with status 201", async () => {
    req.body.password = "somePassword";
    req.body.username = "newUser";

    User.findOne = jest.fn().mockResolvedValue(null);
    User.create = jest.fn().mockResolvedValue({
      _doc: {
        username: "newUser",
        password: "hashedPassword",
        // ... other properties
      },
    });

    const hashedPassword = hashPassword(req.body.password);

    await register(req, res, next);

    expect(User.create).toHaveBeenCalledWith({
      username: "newUser",
      password: hashedPassword,
    });

    expect(res.status).toHaveBeenCalledWith(httpStatusCodes.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      msg: "Account created!",
      data: {
        // ... expected user data (excluding password and __v)
        username: "newUser",
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

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

