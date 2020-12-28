const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

router.get("/", blogController.blog_index);

router.get("/all-blogs", blogController.blog_allBlog);

module.exports = router;
