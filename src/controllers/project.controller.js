// Importa los modelos necesarios
import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";
import { Op } from "sequelize";

export async function getProjects(req, res) {
  try {
    const projects = await Project.findAll({
      include: [{
        model: User,
        as: 'users'
      }]
    });
    res.json(projects);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}
export async function createProject(req, res) {
  const { projectName, description, ownerId } = req.body;

  try {

    const newProject = await Project.create(
      {
        projectName,
        projectOwner: ownerId,
        description,
      },
      {
        fields: ["projectName", "projectOwner", "description"],
      }
      );

      const user = await User.findByPk(ownerId);
      newProject.addUser(user);

    return res.status(201).json(newProject);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

export async function getProject(req, res) {
  const { id } = req.params;
  try {
    const project = await Project.findOne({
      where: {
        id,
      },
      include: [{
        model: User,
        as: 'users'
      }]
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, description } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    project.projectName = projectName;
    project.description = description;
    await project.save();

    console.log(`Proyecto actualizado: ${JSON.stringify(project)}`);
    res.status(202).json(project);
  } catch (error) {
    console.error(`Error al actualizar el proyecto: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  try {
    // Busca y elimina las tareas asociadas al proyecto
    await Task.destroy({
      where: {
        id: id,
      },
    });

    // Busca el proyecto y sus asociaciones con usuarios
    const project = await Project.findByPk(id, {
      include: [{
        model: User,
        as: 'users'
      }]
    });

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    await project.removeUsers(project.users);

    await project.destroy();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function getProjectTasks(req, res) {
  const { id } = req.params;
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "projectId", "name", "done", "description"],
      where: { projectId: id },
    });
    res.json(tasks);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function asignUserToProject(req, res) {
  const { id } = req.params;
  const { userId } = req.body;
  
  try {
    const project = await Project.findByPk(id);
    const user = await User.findByPk(userId);
    
    if(!project || !user) {
      res.status(400).json({ message: 'Proyecto o usuario no encontrado'})
    }

    await project.addUsers(user);

    res.status(202).json({user}, {'message': 'Usuario Asignado correctamente' });
  } catch (e) {

    console.error('Error al asignar usuario', e); 
    res.status(500).json({ message: e.message});
  }
}


