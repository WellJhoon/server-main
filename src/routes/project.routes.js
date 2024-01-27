import {Router} from "express";
import { getProjects, createProject, deleteProject, getProject, getProjectTasks, updateProject, asignUserToProject } from "../controllers/project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", getProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProject);
router.post("/:id/asignUser/:id", asignUserToProject)

router.get("/:id/tasks", getProjectTasks);

export default router;