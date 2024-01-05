var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response200, response404, response500 } = require("../config/response");
const User = require("../models/User");
const { checkInvalidParam } = require("../utils/helper");

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
    const data = new User({
      username,
      encryptedPassword,
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
    res.status(200).json({
      success: true,
      code: 200,
      data: data,
    });
  } catch (error) {
    res.status(500).json(response500);
  }
};

const updateCategory = (req, res) => {};

const deleteCategory = (req, res) => {};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
