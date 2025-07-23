import express from "express";
import { allTeams,myTeams,createTeam, deleteTeam, editTeam, viewTeam, edit, getTeams} from "../controllers/post.js"
import { verifyToken } from "../middleware/jwtAuth.js";

const router=express.Router();

router.post("/create",verifyToken,createTeam);
router.get("/allteams",allTeams);
router.get("/myteams",verifyToken,myTeams);
router.delete("/delete/:id",verifyToken,deleteTeam);
router.patch("/editTeam/:id",verifyToken,editTeam);
router.get("/team/:id",verifyToken,viewTeam);
router.get("/edit/:id",verifyToken,edit);
router.get("/getTeams",verifyToken,getTeams);


export default router;