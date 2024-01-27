// user.routes.js

import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserProjects,
  getUserTasks,
  getUserByClerkId,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/projects", getUserProjects);
router.get("/:id/tasks", getUserTasks);
router.get("/:id/currentUser", getUserByClerkId)

export default router;
