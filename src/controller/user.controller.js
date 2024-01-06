var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
  response200,
  response404,
  response500,
  response401,
} = require("../config/response");
const User = require("../models/User");
const { checkInvalidParam } = require("../utils/helper");
const { MongoServerError, ObjectId } = require("mongodb");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return res.status(200).json({
      ...response200,
      data: users,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    checkInvalidParam(id, res);
    const user = await User.findById(id);
    return res.status(200).json({
      ...response200,
      data: user,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, email, phoneNumber, avatar } = req.body;
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user
    const data = await User.create({
      username,
      password: encryptedPassword,
      email,
      phoneNumber,
      avatar,
      role: "ADMIN",
      created_at: new Date(),
    });

    const token = jwt.sign(
      { user_id: data._id, username, role: data.role },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    data.token = token;

    delete data.password;
    // return new user
    return res.status(200).json({
      ...response200,
      data: data,
    });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      // Handling the "unique" constraint violation
      const uniqueErrorFields = Object.keys(error.keyValue);
      const validationErrors = {};
      let errorLength = 0;
      uniqueErrorFields.forEach((err) => {
        validationErrors[err] = `${
          err === "username" ? "Tên Đăng Nhập" : "Email"
        } đã tồn tại`;
        errorLength += 1;
      });

      // Return the error response
      return res.status(400).json({
        error: true,
        code: 400,
        message: `${errorLength} errors occurred`,
        errors: validationErrors,
      });
    } else res.status(500).json(response500);
  }
};

const loginUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(401).json(response401);
    }
    const user = await User.findOne({ username }).select("username password");

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username, role: user.role, code: user.code },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      const data = { ...user._doc };
      delete data.password;
      // user
      return res.status(200).json({
        success: true,
        code: 200,
        data: data,
      });
    }
    res.status(401).json(response401);
  } catch (err) {
    res.status(500).json(response500);
  }
};

const deleteCategory = (req, res) => {};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
};
