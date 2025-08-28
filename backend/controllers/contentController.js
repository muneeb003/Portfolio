import About from "../Models/About.js";
import Project from "../Models/Project.js";
import Skill from "../Models/Skill.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.find();
    if (!about) {
      return res.status(404).json({ message: "About not found" });
    }
    res.status(200).json(about);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const addAbout = async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json({ message: "Created", about });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const updateAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await About.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Not Found" });
    }
    const updatedAbout = await About.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

// Projects

export const getProject = async (req, res) => {
  try {
    const project = await Project.find();
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const addProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Created", project });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Not Found" });
    }
    const updatedProject = await Project.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Not Found" });
    }
    const updatedProject = await Project.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

// Skill

export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.find();
    if (!skill) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(skill);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const addSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json({ message: "Created", skill });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const updateSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Not Found" });
    }
    const updatedSkill = await Skill.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Not Found" });
    }
    await Skill.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};
