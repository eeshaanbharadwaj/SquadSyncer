import Team from "../models/team.js";
import User from "../models/user.js";
import axios from 'axios';

// Get all Teams without login

export const allTeams=async (req,res)=>{
    try {
        const teams=await Team.find({intake:{$gt:0}});
        res.status(200).json(teams)
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Get all Teams with login

export const getTeams=async (req,res)=>{
    try {
        const userId=req.user;
        const myUser=await User.findById(userId);
        const pending=myUser.pendingRequest;
        const accepted=myUser.acceptedRequest;
        const team=myUser.teams;
        const notInclude=[...pending,...accepted,...team];
        const teams=await Team.find({_id:{$nin:notInclude},intake:{$gt:0}});
        res.status(200).json(teams)
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Get my Teams

export const myTeams=async (req,res)=>{
    try {
        const userId=req.user;
        const newuser= await User.findById(userId);
        const myteams=await Promise.all(newuser.teams.map(async (val)=>{
            const newTeam=await Team.findById(val._id);
            return newTeam;
        }));
        res.status(200).json(myteams);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Create Team

export const createTeam=async (req,res)=>{
    try {
        const userId=req.user;
        const newuser= await User.findById(userId);
        const {description,title,intake,skillRequired}=req.body;
        const newpost= new Team({
            userId,
            adminName:newuser.firstName+" "+newuser.lastName,
            description,
            skillRequired,
            title,
            intake,
            remaining:intake,
            members:[],
        });
        const savedPost=await newpost.save();
        let auth="chatauthenticationmohit6204";
        try{
            await axios.post(`${process.env.BACKEND_URL}/create/${savedPost._id}`,{auth});
        }catch(err){
            console.log(err)
        }
        newuser.teams.push({_id:savedPost._id});
        newuser.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// Delete Team

export const deleteTeam =async (req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.user;
        const team= await Team.findById(id);
        if(userId!==team.userId){
            res.status(403).json("Access Denied!!");
            return;
        }
        await Promise.all(team.members.map(async (newId)=>{
            const newUser=await User.findById(newId);
            newUser.acceptedRequest = newUser.acceptedRequest.filter((request) => request._id.toString() !== id);
            await newUser.save();
        }));
        const regUser=await User.findById(team.userId);
        regUser.teams = regUser.teams.filter((request) => request._id.toString() !== id);
        await regUser.save();
        regUser.joinRequest=await Promise.all(regUser.joinRequest.map(async (value,index)=>{
            if(value.team_id.toString()===id){
                const newUser=await User.findById(value.user_id);
                newUser.pendingRequest = newUser.pendingRequest.filter((request) => request._id.toString() !== id);
                regUser.joinRequest.splice(index,1);
                await newUser.save();
                await regUser.save();
            }
        }));
        try{
            const res = await axios.post(`${process.env.BACKEND_URL}/delete/${team._id}`,{auth: process.env.AUTH})
        }catch(err){
            console.log(err)
        }
        await Team.findByIdAndDelete(team._id);
        res.status(200);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// View Team

export const viewTeam = async (req,res)=>{
    try {
        const {id}=req.params;
        const team= await Team.findById(id);
        const myMembers=await Promise.all(team.members.map(async (id)=>{
            const newUser=await User.findById(id);
            const finalUser={
                name:newUser.firstName+" "+newUser.lastName,
                contactNumber:newUser.contactNumber,
                email:newUser.email,
                skill:newUser.skills,
                id:newUser._id,
            }
            return finalUser;
        }))
        const regUser=await User.findById(team.userId);
        const finalTeam={
            teamId:team._id,
            userId:team.userId,
            title:team.title,
            description:team.description,
            skillRequired:team.skillRequired,
            intake:team.intake,
            remaining:team.remaining,
            members:myMembers,
            name:team.adminName,
            contactNumber:regUser.contactNumber,
            email:regUser.email,
        };
        res.status(200).json(finalTeam);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Edit Team page

export const edit = async (req,res)=>{
    try {
       const {id}=req.params;
       const newTeam=await Team.findById(id);
       const{title,description,intake,skillRequired}=newTeam;
       const response={title,description,intake,skillRequired}
       res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

// Edit Team

export const editTeam = async (req,res)=>{
    try {
       const {id}=req.params;
       const regTeam=await Team.findById(id);
       if(req.user!==regTeam.userId){
        res.status(403).json("Access Denied!!");
        return;
       }
       const newTeam=req.body;
       const team=await Team.findByIdAndUpdate(regTeam._id,newTeam);
       await team.save();
       console.log(team);
       res.status(200);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
