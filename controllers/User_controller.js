const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(400).json({
      message: "No user found",
    });
  }
  return res.status(200).json({
    users,
  });
};

const signup = async (req, res, next) => {
  let { username, email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
  if (existinguser) {
    res.status(400).json({
      message: "User already exists",
    });
  }
  const hasedPassword = bcrypt.hashSync(password);

  const user = new User({
    username,
    email,
    password: hasedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({
    message: "User created",
    user,
  });
};
const login = async (req, res, next) => {
  let { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
  if (!existinguser) {
    res.status(400).json({
      message: "User does not exist",
    });
  }
  const isMatch = bcrypt.compareSync(password, existinguser.password);
  if (!isMatch) {
    res.status(400).json({
      message: "Incorrect password",
    });
  }
  return res.status(200).json({
    message: "Login successful",
    user: existinguser,
  });
};
module.exports = {
  getAllUser,
  signup,
  login,
};
