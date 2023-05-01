const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/posts", isAuth, feedController.getPosts); // GET /feed/posts

router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
); // POST /feed/post

router.get("/post/:postId", isAuth, feedController.getPost); // GET /feed/post/:postId

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
); // PUT /feed/post/:postId

router.delete("/post/:postId", isAuth, feedController.deletePost); // DELETE /feed/post/:postId

module.exports = router;
