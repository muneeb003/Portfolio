import express from "express";
import {
  addAbout,
  addProject,
  addSkill,
  deleteProject,
  deleteSkill,
  getAbout,
  getProject,
  getSkill,
  updateAbout,
  updateProject,
  updateSkill,
} from "../controllers/contentController.js";

const router = express.Router();
//About Section
router.get("/about", getAbout);
router.post("/about", addAbout);
router.put("/about/:id", updateAbout);

//Projects Section
router.get("/project", getProject);
router.post("/project", addProject);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

//Skill Section
router.get("/skill", getSkill);
router.post("/skill", addSkill);
router.put("/skill/:id", updateSkill);
router.delete("/skill/:id", deleteSkill);
export default router;
