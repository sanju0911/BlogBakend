const express = require("express");
const BlogController = require("../controllers/BlogController");

const router = express.Router();

router.get("/", BlogController.getAllBlogs);
router.post("/add", BlogController.createBLog);
router.put("/update/:id", BlogController.updateBlog);
router.get("/:id", BlogController.getBlog);
router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
