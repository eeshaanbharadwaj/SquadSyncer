import express from "express";
import { verifyToken } from "../middleware/jwtAuth.js";
import { acceptedRequest, applyTeam, cancelReq, confirmation, deleteMember, getTeam, joinRequest, pendingRequest } from "../controllers/request.js";

const router=express.Router();

router.get("/pending",verifyToken,pendingRequest);
router.get("/accepted",verifyToken,acceptedRequest);
router.get("/join",verifyToken,joinRequest);
router.post("/apply",verifyToken,applyTeam);
router.post("/confirmation",verifyToken,confirmation);
router.get("/cancelRequest/:id",verifyToken,cancelReq);
router.get("/getTeam/:id",verifyToken,getTeam);
router.delete("/delete/:id/:user_id",verifyToken,deleteMember);


export default router;

