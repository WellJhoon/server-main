// user.controller.js

import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

export const getUsers = async (req, res) => {
  try {
    debugger;
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { userClerkId, name, role } = req.body;

  try {
    const newUser = await User.create({ name, userClerkId, role });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.name = name;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [Project],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user.Projects);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
    
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [Task],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user.Tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getUserByClerkId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findOne({
//       where: { userClerkId: id }
//     });

//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
