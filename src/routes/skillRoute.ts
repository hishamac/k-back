import express from 'express';
import { createSkill,deleteSkill,getAllSkills,getSkillInfo,updateSkill } from '../controllers/skillContoller';


const router = express.Router();

router.post("/skill", createSkill);
router.get("/skills", getAllSkills);
router.get("/skill/:id", getSkillInfo);
router.put("/skill/:id", updateSkill);
router.delete("/skill/:id", deleteSkill);

export default router;