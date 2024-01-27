import { Router } from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTask,
} from "../controllers/task.controller.js";

const router = Router();

// Routes
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getTasks);
router.get("/:id", getTask);

export default router;
