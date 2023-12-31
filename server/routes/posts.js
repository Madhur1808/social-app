import express from "express";

import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
