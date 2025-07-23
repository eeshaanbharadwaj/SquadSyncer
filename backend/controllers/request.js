import Team from "../models/team.js";
import User from "../models/user.js";

// Pending Requests

export const pendingRequest= async (req,res)=>{
  try {
    const userId=req.user;
    const newUser=await User.findById(userId);
    const response=await Promise.all(newUser.pendingRequest.map( async (val)=>{
         const team=await Team.findById(val._id);
         const value={
          adminName:team.adminName,
          title:team.title,
          description:team.description,
          id:team._id,
          size:team.intake,
          message:val.message,
         }
         return value;
    }))
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({error:error.message});
  }
};

// Accepted Requests

export const acceptedRequest= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const response=await Promise.all(newUser.acceptedRequest.map( async (Id)=>{
          const team=await Team.findById(Id);
          const value={
           title:team.title,
           description:team.description,
           id:team._id,
           size:team.intake,
           adminName:team.adminName,
          }
          return value;
     }))
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json({error:error.message});
      }
};

// Joining Requests

export const joinRequest= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const response=await Promise.all(newUser.joinRequest.map( async (val)=>{
          const team=await Team.findById(val.team_id);
          const regUser=await User.findById(val.user_id);
          const value={
           title:team.title,
           description:team.description,
           skillRequired:team.skillRequired,
           team_id:team._id,
           size:team.intake,
           message:val.message,
           name:regUser.firstName+" "+regUser.lastName,
           email:regUser.email,
           contactNumber:regUser.contactNumber,
           skill:regUser.skills,
           user_id:val.user_id,
          }
          return value;
     }))
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json({error:error.message});
      }
};

// Apply to a Team 

export const applyTeam= async (req,res)=>{
    try {
        const userId=req.user;
        const newUser=await User.findById(userId);
        const {id,message}=req.body;
        const team=await Team.findById(id);
        const regUser=await User.findById(team.userId);
        regUser.joinRequest.push({team_id:id,user_id:userId,message:message});
        newUser.pendingRequest.push({_id:id,message:message});
        regUser.save();
        newUser.save();
        res.status(200).json({newUser});
      } catch (error) {
        res.status(404).json({error:error.message});
      }
};

// Accepting or Rejecting a Team

export const confirmation= async (req,res)=>{
  try {
    const userId=req.user;
    const regUser=await User.findById(userId);
    const {team_id,isConfirmed,user_id}=req.body;
    const team=await Team.findById(team_id);
    if(userId!==team.userId){
      res.status(403).json("Accsess Denied!!");
    }
    const newUser=await User.findById(user_id);
    if(isConfirmed){
      team.members.push({_id:user_id});
      team.remaining=team.remaining-1;
      newUser.acceptedRequest.push({_id:team_id});
    }
      newUser.pendingRequest = newUser.pendingRequest.filter((request) => request._id.toString() !== team_id);
      regUser.joinRequest = regUser.joinRequest.filter((request) => request.team_id.toString() !== team_id );
    team.save();
    newUser.save();
    regUser.save();

    const response=await Promise.all(regUser.joinRequest.map( async (val)=>{
      const team=await Team.findById(val.team_id);
      const myUser=await User.findById(val.user_id);
      const value={
       title:team.title,
       description:team.description,
       team_id:team._id,
       skillRequired:team.skillRequired,
       size:team.intake,
       message:val.message,
       name:myUser.firstName+" "+myUser.lastName,
       email:myUser.email,
       skill:regUser.skills,
       contactNumber:myUser.contactNumber,
       user_id:val.user_id,
      }
      return value;
 }))
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({error:error.message});
  }
};

// Cancel a Pending Request

export const cancelReq = async(req,res)=>{
  try {
    const user= await User.findById(req.user);
    const {id}=req.params;
    const team= await Team.findById(id);
    const regUser=await User.findById(team.userId);
    user.pendingRequest = user.pendingRequest.filter((request) => request._id.toString() !== id);
    regUser.joinRequest = regUser.joinRequest.filter((request) => request.team_id.toString() !== id );
    await user.save();
    await regUser.save();
    const response=await Promise.all(user.pendingRequest.map( async (val)=>{
      const team=await Team.findById(val._id);
      const value={
       adminName:team.adminName,
       title:team.title,
       description:team.description,
       id:team._id,
       size:team.intake,
       message:val.message,
      }
      return value;
 }))
 res.status(200).json(response);
  } catch (error) {
    res.status(404).json({error:error.message});
  }
};

//get a Team for apply

export const getTeam= async (req,res)=>{
  try {
    const {id}=req.params;
    const team= await Team.findById(id);
    let isPending=false;
    let message="";
    const regUser=await User.findById(team.userId);
    regUser.joinRequest.map((value)=>{
         if(value.team_id===id){
           isPending=true;
           message=value.message;
         }
    });
    const finalTeam={
        teamId:team._id,
        userId:team.userId,
        title:team.title,
        skillRequired:team.skillRequired,
        description:team.description,
        intake:team.intake,
        remaining:team.remaining,
        isPending:isPending,
        message:message,
        name:team.adminName,
        contactNumber:regUser.contactNumber,
        email:regUser.email,
    };
    res.status(200).json(finalTeam);
} catch (error) {
    res.status(404).json({error:error.message});
}
}

// Delete a team member

export const deleteMember = async(req,res)=>{
  try {
      const {id,user_id}=req.params;
      const team=await Team.findById(id);
      const user=await User.findById(user_id);
      team.remaining=team.remaining+1;
      user.acceptedRequest = user.acceptedRequest.filter((request) => request._id.toString() !== id);
      team.members = team.members.filter((request) => request._id.toString() !== user_id);
      await user.save();
      await team.save();

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
          skillRequired:team.skillRequired,
          description:team.description,
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

// Get Chat Data
