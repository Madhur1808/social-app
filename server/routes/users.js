import express from "express";

import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

app.get("/:id", verifyToken, getUser);
app.get("/:id/friends", verifyToken, getUserFriends);

app.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
