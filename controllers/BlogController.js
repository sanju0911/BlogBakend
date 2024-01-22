const Blog = require("../models/Blog");
const User = require("../models/user");
const mongoose = require("mongoose");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(400).json({
      message: "No blogs found",
    });
  }
  return res.status(200).json({
    blogs,
  });
};
const createBLog = async (req, res, next) => {
  let { title, description, image, user } = req.body;

  let existinguser;
  try {
    existinguser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }
  if (!existinguser) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existinguser.blogs.push(blog);
    await existinguser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({
    message: "Blog created",
    blog,
  });
};
const updateBlog = async (req, res, next) => {
  let { title, description, image, user } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      description,
      image,
      user,
    });
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      message: "Blog updated",
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};
const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      message: "Blog deleted",
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllBlogs,
  createBLog,
  updateBlog,
  getBlog,
  deleteBlog,
};
